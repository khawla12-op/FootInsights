import React from "react";

import type { AvatarProps } from "antd";
import { Avatar as AntdAvatar } from "antd";
import { getNameInitials } from "@/utilities";

type Props = AvatarProps & {
  name?: string;
};

const CustomAvatar = ({ name = "", style, ...rest }: Props) => {
  return (
    <AntdAvatar
      alt={name}
      size="small"
      style={{
        backgroundColor: '#87d068',
        // backgroundColor: rest?.src
        //   ? "transparent"
        //   : getRandomColorFromString(name),
        display: "flex",
        alignItems: "center",
        border: "none",
        ...style,
      }}
      {...rest}
    >
      {getNameInitials(name)}
    </AntdAvatar>
  );
};

export default CustomAvatar
//   CustomAvatar,
//   (prevProps, nextProps) => {
//     return prevProps.name === nextProps.name && prevProps.src === nextProps.src;
//   },