import { createContext, useContext, useEffect, useRef, useState } from "react";
import supabase from "../supabaseClient";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  let myChannel = null;
  const [username, setUsername] = useState("");
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [routeHash, setRouteHash] = useState("");
  const [isOnBottom, setIsOnBottom] = useState(false);
  const [newIncomingMessageTrigger, setNewIncomingMessageTrigger] =
    useState(null);
  const [unviewedMessageCount, setUnviewedMessageCount] = useState(0);
  const [countryCode, setCountryCode] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      scrollToBottom();
    }
  }, [messages]);

  const getLocation = async () => {
    try {
      const res = await fetch("https://api.db-ip.com/v2/free/self");
      const { countryCode, error } = await res.json();
      if (error) throw new Error(error);

      setCountryCode(countryCode);
      localStorage.setItem("countryCode", countryCode);
    } catch (error) {
      console.error(
        `error getting location from api.db-ip.com:`,
        error.message
      );
    }
  };

  const randomUsername = () => {
    return `@user${Date.now().toString().slice(-4)}`;
  };
  const initializeUser = (session) => {
    setSession(session);
    // const {
    //   data: { session },
    // } = await supabase.auth.getSession();

    let username;
    if (session) {
      username = session.user.user_metadata.user_name;
    } else {
      username = localStorage.getItem("username") || randomUsername();
    }
    setUsername(username);
    localStorage.setItem("username", username);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      initializeUser(session);
    });

    updateMessages();

    const storedCountryCode = localStorage.getItem("countryCode");
    if (storedCountryCode && storedCountryCode !== "undefined")
      setCountryCode(storedCountryCode);
    else getLocation();

    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("onAuthStateChange", { _event, session });
      initializeUser(session);
    });

    return () => {
      if (myChannel) {
        supabase.removeChannel(myChannel);
      }

      authSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!newIncomingMessageTrigger) return;

    if (newIncomingMessageTrigger.username === username) {
      scrollToBottom();
    } else {
      setUnviewedMessageCount((prevCount) => prevCount + 1);
    }
  }, [newIncomingMessageTrigger]);

  const getInitialMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select()
      .range(0, 49)
      .order("id", { ascending: false });

    setLoadingInitial(false);

    if (error) {
      setError(error.message);
      return;
    }

    setIsInitialLoad(true);
    setMessages(data);
  };

  const updateMessages = async () => {
    setError("");

    await getInitialMessages();
  };

  const scrollRef = useRef();
  const onScroll = async ({ target }) => {
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 1) {
      setUnviewedMessageCount(0);
      setIsOnBottom(true);
    } else {
      setIsOnBottom(false);
    }

    //* Load more messages when reaching top
    if (target.scrollTop === 0) {
      // console.log("messages.length :>> ", messages.length);
      const { data, error } = await supabase
        .from("messages")
        .select()
        .range(messages.length, messages.length + 49)
        .order("id", { ascending: false });
      if (error) {
        setError(error.message);
        return;
      }
      target.scrollTop = 1;
      setMessages((prevMessages) => [...prevMessages, ...data]);
    }
  };

  const scrollToBottom = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  return (
    <AppContext.Provider
      value={{
        messages,
        loadingInitial,
        error,
        updateMessages,
        username,
        setUsername,
        randomUsername,
        routeHash,
        scrollRef,
        onScroll,
        scrollToBottom,
        isOnBottom,
        country: countryCode,
        unviewedMessageCount,
        session,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContext as default, AppContextProvider, useAppContext };
