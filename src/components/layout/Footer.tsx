import { Box, Grid, GridItem } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box position="fixed" bottom="0" width="100%">
      <Grid
        gridTemplateColumns="auto 1fr"
        textAlign="center"
        alignItems="center"
        py="4px"
        px="30px"
        height="50px"
        bg="#343a40"
        color="#fff"
      >
        <GridItem justifySelf="start">
          ©{new Date().getFullYear()} Libretto
        </GridItem>
        <GridItem justifySelf="end">
          All Rights Reserved.
        </GridItem>
      </Grid>
    </Box>
  );
}
