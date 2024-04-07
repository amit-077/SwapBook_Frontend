import { Box, Image } from "@chakra-ui/react";
import React from "react";

const ImageBox = ({ img, ind, selectedBox, setSelectedBox }) => {
  return (
    <Box
      w={"100%"}
      h={"5.5rem"}
      borderBottom={"0.1px solid #e8e8e8"}
      borderLeft={"0.1px solid #e8e8e8"}
      borderTop={ind === 0 ? "0.1px solid #e8e8e8" : null}
      border={selectedBox === ind ? "2px solid #2874f0" : null}
      p={"0.3rem"}
      bgColor={"#f5ffff"}
      cursor={"pointer"}
      onClick={() => {
        setSelectedBox(ind);
      }}
    >
      <Image src={img} w={"100%"} h={"100%"} objectFit={"contain"} />
    </Box>
  );
};

export default ImageBox;
