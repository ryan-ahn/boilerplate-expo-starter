import React from "react";

import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from "react-native-svg";

import { useTheme } from "@hooks/useTheme";

export type Name =
  | "check"
  | "circle-check"
  | "circle-x"
  | "circle-info"
  | "circle-alert"
  | "circle-google"
  | "circle-kakao"
  | "circle-naver"
  | "share"
  | "book-read"
  | "bookmark"
  | "star"
  | "pencil"
  | "heart"
  | "chat"
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "chevron-up"
  | "close"
  | "arrow-left"
  | "more-vertical"
  | "cart"
  | "cart-add"
  | "bell"
  | "home"
  | "search"
  | "edit"
  | "setting"
  | "view"
  | "refresh"
  | "trash"
  | "docs"
  | "delivery";

type Variant = "fill" | "stroke";

type Size = "xsmall" | "small" | "medium" | "large" | number;

interface Props {
  name: Name;
  variant?: Variant;
  size?: Size;
  color?: string;
}

/** ===============================
 * 아이콘 컴포넌트
 * @param name 아이콘 이름
 * @param variant 아이콘 형태
 * @param size 아이콘 크기
 * @param color 아이콘 색상
 * @returns 아이콘 컴포넌트
 * =============================== */
const Icon = ({ name, variant = "stroke", size = "medium", color }: Props) => {
  // hooks
  const { colors } = useTheme();
  // variables
  const initColor = color || colors("gray", 900);
  // variants
  const getSize = (): number => {
    if (typeof size === "number") {
      return size;
    }
    switch (size) {
      case "xsmall":
        return 16;
      case "small":
        return 20;
      case "medium":
        return 24;
      case "large":
        return 32;
      default:
        return 20;
    }
  };
  // render
  if (name === "check") {
    return (
      <Svg
        width={getSize()}
        height={getSize()}
        viewBox="0 0 32 32"
        fill={"none"}>
        <Path
          d="M28 7L12 25L4 16.8182"
          stroke={initColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "circle-check") {
    return (
      <Svg
        width={getSize()}
        height={getSize()}
        viewBox="0 0 32 32"
        fill={variant === "fill" ? initColor : "none"}>
        <Path
          d="M16 27.9999C22.6274 27.9999 28 22.6273 28 15.9999C28 9.37246 22.6274 3.99988 16 3.99988C9.37258 3.99988 4 9.37246 4 15.9999C4 22.6273 9.37258 27.9999 16 27.9999Z"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M22 12L14 20L9 15"
          stroke={variant === "fill" ? colors("background") : initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "circle-x") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
          fill={variant === "fill" ? initColor : "none"}
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21 11L11 21M11 11L21 21"
          stroke={variant === "fill" ? colors("background") : initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "circle-info") {
    return (
      <Svg
        width={getSize()}
        height={getSize()}
        viewBox="0 0 32 32"
        fill={variant === "fill" ? initColor : "none"}>
        <Path
          d="M16 27.9999C22.6274 27.9999 28 22.6273 28 15.9999C28 9.37246 22.6274 3.99988 16 3.99988C9.37258 3.99988 4 9.37246 4 15.9999C4 22.6273 9.37258 27.9999 16 27.9999Z"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16 21L16 16.2M16 11.4L15.988 11.4"
          stroke={variant === "fill" ? colors("background") : initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "circle-google") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 24 24" fill="none">
        <G clip-path="url(#clip0_5801_3159)">
          <Circle cx="12" cy="12" r="11.5" fill="#E4E4E4" />
          <Path
            d="M19.8799 12.1815C19.8799 11.6143 19.829 11.0688 19.7345 10.5452H12.2V13.6433H16.5054C16.3163 14.6397 15.749 15.4833 14.8981 16.0506V18.0652H17.4945C19.0072 16.6688 19.8799 14.6179 19.8799 12.1815Z"
            fill="#4285F4"
          />
          <Path
            d="M12.1999 19.9996C14.3599 19.9996 16.1708 19.2869 17.4945 18.065L14.8981 16.0505C14.1854 16.5305 13.2763 16.8214 12.1999 16.8214C10.1199 16.8214 8.35265 15.4178 7.71992 13.5269H5.05811V15.5923C6.37447 18.2032 9.07265 19.9996 12.1999 19.9996Z"
            fill="#34A853"
          />
          <Path
            d="M7.71995 13.5202C7.55995 13.0402 7.46541 12.5312 7.46541 12.0002C7.46541 11.4693 7.55995 10.9602 7.71995 10.4802V8.41479H5.05813C4.51268 9.49116 4.19995 10.7057 4.19995 12.0002C4.19995 13.2948 4.51268 14.5093 5.05813 15.5857L7.13086 13.9712L7.71995 13.5202Z"
            fill="#FBBC05"
          />
          <Path
            d="M12.1999 7.18545C13.3781 7.18545 14.4254 7.59273 15.2617 8.37818L17.5527 6.08727C16.1636 4.79273 14.3599 4 12.1999 4C9.07265 4 6.37447 5.79636 5.05811 8.41455L7.71992 10.48C8.35265 8.58909 10.1199 7.18545 12.1999 7.18545Z"
            fill="#EA4335"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_5801_3159">
            <Rect width="24" height="24" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    );
  }

  if (name === "circle-naver") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 16 16" fill="none">
        <Path
          d="M15.2024 7.60119C15.2024 11.7997 11.7998 15.2024 7.60119 15.2024C3.40265 15.2024 0 11.7997 0 7.60119C0 3.40261 3.40265 0 7.60119 0C11.7998 0 15.2024 3.40261 15.2024 7.60119ZM8.874 4.031V7.8525L6.21888 4.031H4.02777V11.1747H6.32842V7.35307L8.98354 11.1747H11.1747V4.031H8.874Z"
          fill={initColor}
        />
      </Svg>
    );
  }

  if (name === "circle-kakao") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 24 24" fill="none">
        <G clipPath="url(#clip0_5801_3166)">
          <Circle cx="12" cy="12" r="11.5" fill="#FAE100" />
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 7.2959C9.11289 7.2959 6.77271 9.23307 6.77271 11.6223C6.77271 13.1081 7.67784 14.418 9.05617 15.1971L8.47624 17.467C8.425 17.6676 8.63909 17.8274 8.80349 17.7112L11.3456 15.9136C11.5602 15.9357 11.7782 15.9487 12 15.9487C14.8869 15.9487 17.2273 14.0116 17.2273 11.6223C17.2273 9.23307 14.8869 7.2959 12 7.2959Z"
            fill="black"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_5801_3166">
            <Rect width="24" height="24" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    );
  }

  if (name === "share") {
    return (
      <Svg
        width={getSize()}
        height={getSize()}
        viewBox="0 0 32 32"
        fill={variant === "fill" ? initColor : "none"}>
        <Path
          d="M11.4533 18.0134L20.56 23.3201M20.5467 8.68008L11.4533 13.9867M28 6.66675C28 8.87589 26.2091 10.6667 24 10.6667C21.7909 10.6667 20 8.87589 20 6.66675C20 4.45761 21.7909 2.66675 24 2.66675C26.2091 2.66675 28 4.45761 28 6.66675ZM12 16.0001C12 18.2092 10.2091 20.0001 8 20.0001C5.79086 20.0001 4 18.2092 4 16.0001C4 13.7909 5.79086 12.0001 8 12.0001C10.2091 12.0001 12 13.7909 12 16.0001ZM28 25.3334C28 27.5426 26.2091 29.3334 24 29.3334C21.7909 29.3334 20 27.5426 20 25.3334C20 23.1243 21.7909 21.3334 24 21.3334C26.2091 21.3334 28 23.1243 28 25.3334Z"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "book-read") {
    return (
      <Svg
        width={getSize()}
        height={getSize()}
        viewBox="0 0 32 32"
        fill={variant === "fill" ? initColor : "none"}>
        <Path
          d="M16 9.8C16 8.52696 15.4943 7.30606 14.5941 6.40589C13.6939 5.50571 12.473 5 11.2 5H4V23H12.4C13.3548 23 14.2705 23.3793 14.9456 24.0544C15.6207 24.7295 16 25.6452 16 26.6M16 9.8V26.6M16 9.8C16 8.52696 16.5057 7.30606 17.4059 6.40589C18.3061 5.50571 19.527 5 20.8 5H28V23H19.6C18.6452 23 17.7295 23.3793 17.0544 24.0544C16.3793 24.7295 16 25.6452 16 26.6"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "bookmark") {
    return (
      <Svg
        width={getSize()}
        height={getSize()}
        viewBox="0 0 32 32"
        fill={variant === "fill" ? initColor : "none"}>
        <Path
          d="M25.3337 28L16.0003 21.3333L6.66699 28V6.66667C6.66699 5.95942 6.94794 5.28115 7.44804 4.78105C7.94814 4.28095 8.62641 4 9.33366 4H22.667C23.3742 4 24.0525 4.28095 24.5526 4.78105C25.0527 5.28115 25.3337 5.95942 25.3337 6.66667V28Z"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "star") {
    return (
      <Svg
        width={getSize()}
        height={getSize()}
        viewBox="0 0 32 32"
        fill={variant === "fill" ? initColor : "none"}>
        <Path
          d="M16.0003 2.66663L20.1203 11.0133L29.3337 12.36L22.667 18.8533L24.2403 28.0266L16.0003 23.6933L7.76033 28.0266L9.33366 18.8533L2.66699 12.36L11.8803 11.0133L16.0003 2.66663Z"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "pencil") {
    return (
      <Svg
        width={getSize()}
        height={getSize()}
        viewBox="0 0 32 32"
        fill={variant === "fill" ? initColor : "none"}>
        <Path
          d="M22.667 3.99996C23.0172 3.64976 23.4329 3.37198 23.8905 3.18245C24.348 2.99293 24.8384 2.89539 25.3337 2.89539C25.8289 2.89539 26.3193 2.99293 26.7768 3.18245C27.2344 3.37198 27.6501 3.64976 28.0003 3.99996C28.3505 4.35015 28.6283 4.76588 28.8178 5.22343C29.0074 5.68098 29.1049 6.17138 29.1049 6.66662C29.1049 7.16187 29.0074 7.65226 28.8178 8.10981C28.6283 8.56736 28.3505 8.9831 28.0003 9.33329L10.0003 27.3333L2.66699 29.3333L4.66699 22L22.667 3.99996Z"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "heart") {
    return (
      <Svg
        width={getSize()}
        height={getSize()}
        viewBox="0 0 32 32"
        fill={variant === "fill" ? initColor : "none"}>
        <Path
          d="M4 12.05C4 19.1 11.8 25.5091 16 27C20.2 25.5091 28 19.1 28 12.05C28 8.15642 25.0451 5 21.4 5C19.1678 5 17.1944 6.1837 16 7.99549C14.8056 6.1837 12.8322 5 10.6 5C6.95492 5 4 8.15642 4 12.05Z"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "chat") {
    return (
      <Svg
        width={getSize()}
        height={getSize()}
        viewBox="0 0 32 32"
        fill={variant === "fill" ? initColor : "none"}>
        <Path
          d="M28 15.4801C28 21.8198 22.6267 26.9601 16 26.9601C15.2208 26.9611 14.4439 26.8891 13.6785 26.7453C13.1276 26.6419 12.8521 26.5902 12.6598 26.6195C12.4675 26.6489 12.195 26.7938 11.65 27.0837C10.1082 27.9036 8.31034 28.1932 6.58133 27.8716C7.23849 27.0633 7.68729 26.0934 7.88533 25.0537C8.00533 24.4178 7.708 23.8 7.26267 23.3477C5.24 21.2938 4 18.5261 4 15.4801C4 9.14028 9.37333 4 16 4C22.6267 4 28 9.14028 28 15.4801Z"
          fill={variant === "fill" ? initColor : "none"}
        />
        <Path
          d="M16 26.9601L16 25.9601L15.9987 25.9601L16 26.9601ZM6.58133 27.8716L5.80541 27.2407C5.58284 27.5145 5.521 27.8853 5.6427 28.2165C5.76439 28.5477 6.05159 28.7902 6.39847 28.8547L6.58133 27.8716ZM7.88533 25.0537L8.86767 25.2408L8.86799 25.2392L7.88533 25.0537ZM7.26267 23.3477L7.9752 22.6461L7.97517 22.6461L7.26267 23.3477ZM13.6785 26.7453L13.4939 27.7282L13.4939 27.7282L13.6785 26.7453ZM11.65 27.0837L12.1195 27.9666L12.1195 27.9666L11.65 27.0837ZM27 15.4801C27 21.2263 22.1166 25.9601 16 25.9601V27.9601C23.1367 27.9601 29 22.4134 29 15.4801H27ZM15.9987 25.9601C15.2821 25.961 14.5673 25.8948 13.8631 25.7625L13.4939 27.7282C14.3204 27.8834 15.1596 27.9612 16.0013 27.9601L15.9987 25.9601ZM7.35725 28.5024C8.12063 27.5635 8.63916 26.4406 8.86767 25.2408L6.90299 24.8666C6.73543 25.7463 6.35634 26.5631 5.80541 27.2407L7.35725 28.5024ZM8.86799 25.2392C9.06969 24.1703 8.55802 23.2379 7.9752 22.6461L6.55014 24.0494C6.85798 24.362 6.94098 24.6653 6.90268 24.8683L8.86799 25.2392ZM7.97517 22.6461C6.12482 20.7672 5 18.247 5 15.4801H3C3 18.8052 4.35518 21.8205 6.55017 24.0494L7.97517 22.6461ZM5 15.4801C5 9.73386 9.8834 5 16 5V3C8.86327 3 3 8.5467 3 15.4801H5ZM16 5C22.1166 5 27 9.73386 27 15.4801H29C29 8.5467 23.1367 3 16 3V5ZM11.1804 26.2008C9.83446 26.9165 8.26622 27.1678 6.76419 26.8884L6.39847 28.8547C8.35447 29.2185 10.3819 28.8907 12.1195 27.9666L11.1804 26.2008ZM13.8631 25.7625C13.5978 25.7127 13.3626 25.6682 13.1706 25.6419C12.984 25.6163 12.7512 25.594 12.5089 25.631L12.8108 27.6081C12.7608 27.6157 12.7619 27.6046 12.8988 27.6233C13.0303 27.6414 13.2083 27.6745 13.4939 27.7282L13.8631 25.7625ZM12.1195 27.9666C12.4006 27.8171 12.5813 27.7213 12.7162 27.6572C12.8624 27.5878 12.8677 27.5994 12.8108 27.6081L12.5089 25.631C12.2597 25.669 12.0326 25.7678 11.8582 25.8506C11.6725 25.9388 11.4444 26.0604 11.1804 26.2008L12.1195 27.9666Z"
          fill={initColor}
        />
        <Path
          d="M15.9948 15C15.4425 15 14.9948 15.4477 14.9948 16C14.9948 16.5523 15.4425 17 15.9948 17V15ZM16.0056 17C16.5579 17 17.0056 16.5523 17.0056 16C17.0056 15.4477 16.5579 15 16.0056 15V17ZM20.7894 15C20.2371 15 19.7894 15.4477 19.7894 16C19.7894 16.5523 20.2371 17 20.7894 17V15ZM20.8002 17C21.3525 17 21.8002 16.5523 21.8002 16C21.8002 15.4477 21.3525 15 20.8002 15V17ZM11.2002 15C10.6479 15 10.2002 15.4477 10.2002 16C10.2002 16.5523 10.6479 17 11.2002 17V15ZM11.211 17C11.7632 17 12.211 16.5523 12.211 16C12.211 15.4477 11.7632 15 11.211 15V17ZM15.9948 17H16.0056V15H15.9948V17ZM20.7894 17H20.8002V15H20.7894V17ZM11.2002 17H11.211V15H11.2002V17Z"
          fill={variant === "fill" ? colors("background") : initColor}
        />
      </Svg>
    );
  }

  if (name === "circle-alert") {
    return (
      <Svg
        width={getSize()}
        height={getSize()}
        viewBox="0 0 32 32"
        fill={variant === "fill" ? initColor : "none"}>
        <Path
          d="M16 27.9999C22.6274 27.9999 28 22.6273 28 15.9999C28 9.37246 22.6274 3.99988 16 3.99988C9.37258 3.99988 4 9.37246 4 15.9999C4 22.6273 9.37258 27.9999 16 27.9999Z"
          fill={variant === "fill" ? initColor : "none"}
          stroke={variant === "stroke" ? initColor : "none"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16 11.1998V15.9998M16 20.7998H16.012"
          stroke={variant === "stroke" ? initColor : colors("background")}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "chevron-left") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M19 24L11 16L19 8"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "chevron-right") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M13 24L21 16L13 8"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "chevron-down") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M8 12L16 20L24 12"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "chevron-up") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M24 20L16 12L8 20"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "close") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M25 7L7 25M7 7L25 25"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "arrow-left") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M25 15.9999H7M7 15.9999L16 24.9999M7 15.9999L16 6.99991"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "more-vertical") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M16.0003 17.3333C16.7367 17.3333 17.3337 16.7364 17.3337 16C17.3337 15.2636 16.7367 14.6667 16.0003 14.6667C15.2639 14.6667 14.667 15.2636 14.667 16C14.667 16.7364 15.2639 17.3333 16.0003 17.3333Z"
          fill={initColor}
        />
        <Path
          d="M16.0003 8C16.7367 8 17.3337 7.40305 17.3337 6.66667C17.3337 5.93029 16.7367 5.33334 16.0003 5.33334C15.2639 5.33334 14.667 5.93029 14.667 6.66667C14.667 7.40305 15.2639 8 16.0003 8Z"
          fill={initColor}
        />
        <Path
          d="M16.0003 26.6667C16.7367 26.6667 17.3337 26.0697 17.3337 25.3333C17.3337 24.597 16.7367 24 16.0003 24C15.2639 24 14.667 24.597 14.667 25.3333C14.667 26.0697 15.2639 26.6667 16.0003 26.6667Z"
          fill={initColor}
        />
        <Path
          d="M16.0003 17.3333C16.7367 17.3333 17.3337 16.7364 17.3337 16C17.3337 15.2636 16.7367 14.6667 16.0003 14.6667C15.2639 14.6667 14.667 15.2636 14.667 16C14.667 16.7364 15.2639 17.3333 16.0003 17.3333Z"
          stroke={initColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.0003 8C16.7367 8 17.3337 7.40305 17.3337 6.66667C17.3337 5.93029 16.7367 5.33334 16.0003 5.33334C15.2639 5.33334 14.667 5.93029 14.667 6.66667C14.667 7.40305 15.2639 8 16.0003 8Z"
          stroke={initColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.0003 26.6667C16.7367 26.6667 17.3337 26.0697 17.3337 25.3333C17.3337 24.597 16.7367 24 16.0003 24C15.2639 24 14.667 24.597 14.667 25.3333C14.667 26.0697 15.2639 26.6667 16.0003 26.6667Z"
          stroke={initColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "cart") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M6.7002 7H10.1288L12.4259 18.4771C12.5043 18.8718 12.719 19.2263 13.0324 19.4785C13.3458 19.7308 13.7379 19.8649 14.1402 19.8571H22.4716C22.8739 19.8649 23.266 19.7308 23.5794 19.4785C23.8928 19.2263 24.1075 18.8718 24.1859 18.4771L25.5573 11.2857H10.9859M14.4145 24.1429C14.4145 24.6162 14.0307 25 13.5573 25C13.084 25 12.7002 24.6162 12.7002 24.1429C12.7002 23.6695 13.084 23.2857 13.5573 23.2857C14.0307 23.2857 14.4145 23.6695 14.4145 24.1429ZM23.8431 24.1429C23.8431 24.6162 23.4593 25 22.9859 25C22.5125 25 22.1288 24.6162 22.1288 24.1429C22.1288 23.6695 22.5125 23.2857 22.9859 23.2857C23.4593 23.2857 23.8431 23.6695 23.8431 24.1429Z"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "cart-add") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M4 4.33008H6.6264C7.0951 4.33008 7.50091 4.65561 7.60259 5.11315L10.6831 18.9756C10.7848 19.4331 11.1906 19.7586 11.6593 19.7586H23.9316C24.3216 19.7586 24.6761 19.5319 24.8396 19.1777L28 12.3301"
          stroke={initColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M18.5731 12.9016V6.04443M15.1445 9.473L22.0017 9.47301"
          stroke={initColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Rect
          x="19.4336"
          y="23.1873"
          width="5.14286"
          height="5.14286"
          rx="2.57143"
          stroke={initColor}
          strokeWidth="1.5"
        />
        <Rect
          x="10.8555"
          y="23.1873"
          width="5.14286"
          height="5.14286"
          rx="2.57143"
          stroke={initColor}
          strokeWidth="1.5"
        />
      </Svg>
    );
  }

  if (name === "bell") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Rect width="32" height="32" fill={initColor} />
        <G id="Bell">
          <Rect x="-197" y="-20" width="249" height="72" rx="5" fill="white" />
          <G id="Size=32, Style=Stoke, Color=Primary">
            <Path
              id="Icon"
              d="M17.9222 24.9037C17.7269 25.2371 17.4465 25.5139 17.1091 25.7063C16.7718 25.8987 16.3893 26 16 26C15.6107 26 15.2282 25.8987 14.8909 25.7063C14.5535 25.5139 14.2731 25.2371 14.0778 24.9037M22.6667 12.6012C22.6667 10.8504 21.9643 9.1714 20.714 7.93344C19.4638 6.69548 17.7681 6 16 6C14.2319 6 12.5362 6.69548 11.286 7.93344C10.0357 9.1714 9.33333 10.8504 9.33333 12.6012C9.33333 20.3025 6 22.5029 6 22.5029H26C26 22.5029 22.6667 20.3025 22.6667 12.6012Z"
              stroke={initColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </G>
        </G>
      </Svg>
    );
  }

  if (name === "home") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Rect width="32" height="32" fill="white" />
        <Path
          d="M16 21.974V18.9546M6 15.8571V21.974C6 24.1975 7.79086 26 10 26H22C24.2091 26 26 24.1975 26 21.974V15.8571C26 14.6341 25.4476 13.4774 24.4988 12.7134L18.4988 7.88221C17.0379 6.70593 14.9621 6.70593 13.5012 7.88221L7.50122 12.7134C6.55236 13.4774 6 14.6341 6 15.8571Z"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "search") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M25 25L20.65 20.65M23 15C23 19.4183 19.4183 23 15 23C10.5817 23 7 19.4183 7 15C7 10.5817 10.5817 7 15 7C19.4183 7 23 10.5817 23 15Z"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "edit") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M15.4619 25H24.9238M20.1928 7.65321C20.6111 7.23497 21.1783 7 21.7698 7C22.0627 7 22.3527 7.05769 22.6233 7.16976C22.8938 7.28184 23.1397 7.44611 23.3468 7.65321C23.5539 7.8603 23.7182 8.10615 23.8302 8.37673C23.9423 8.64731 24 8.93732 24 9.23019C24 9.52306 23.9423 9.81307 23.8302 10.0836C23.7182 10.3542 23.5539 10.6001 23.3468 10.8072L10.2053 23.9487L6 25L7.05132 20.7947L20.1928 7.65321Z"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "setting") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 24 24" fill="none">
        <Path
          d="M21.4922 7.13358L20.986 6.27698C20.6031 5.62915 20.4117 5.30523 20.086 5.17607C19.7603 5.0469 19.3919 5.14883 18.6551 5.35267L17.4036 5.69637C16.9333 5.80212 16.4398 5.74213 16.0103 5.52698L15.6648 5.33261C15.2965 5.10262 15.0132 4.76352 14.8564 4.36493L14.5139 3.36754C14.2887 2.70753 14.1761 2.37752 13.908 2.18876C13.6399 2 13.2838 2 12.5717 2H11.4283C10.7162 2 10.3601 2 10.092 2.18876C9.82393 2.37752 9.71133 2.70753 9.48612 3.36754L9.1436 4.36493C8.9868 4.76352 8.70352 5.10262 8.33523 5.33261L7.98971 5.52698C7.56023 5.74213 7.06675 5.80212 6.59638 5.69637L5.34486 5.35267C4.60811 5.14883 4.23973 5.0469 3.91402 5.17607C3.5883 5.30523 3.39687 5.62915 3.014 6.27698L2.50776 7.13358C2.14888 7.74083 1.96944 8.04446 2.00426 8.36768C2.03909 8.6909 2.27931 8.95137 2.75975 9.47231L3.81723 10.625C4.07569 10.944 4.25918 11.5 4.25918 11.9998C4.25918 12.5 4.07575 13.0558 3.81725 13.3749L2.75976 14.5276C2.27931 15.0485 2.03909 15.309 2.00427 15.6322C1.96944 15.9555 2.14888 16.2591 2.50776 16.8663L3.01399 17.7229C3.39684 18.3707 3.5883 18.6947 3.91402 18.8238C4.23974 18.953 4.60812 18.8511 5.34488 18.6472L6.59634 18.3035C7.06678 18.1977 7.56036 18.2578 7.9899 18.473L8.33537 18.6674C8.70358 18.8974 8.9868 19.2364 9.14357 19.635L9.48612 20.6325C9.71133 21.2925 9.82393 21.6225 10.092 21.8112C10.3601 22 10.7162 22 11.4283 22H12.5717C13.2838 22 13.6399 22 13.908 21.8112C14.1761 21.6225 14.2887 21.2925 14.5139 20.6325L14.8564 19.635C15.0132 19.2364 15.2964 18.8974 15.6646 18.6674L16.0101 18.473C16.4396 18.2578 16.9332 18.1977 17.4037 18.3035L18.6551 18.6472C19.3919 18.8511 19.7603 18.953 20.086 18.8238C20.4117 18.6947 20.6032 18.3707 20.986 17.7229L21.4922 16.8663C21.8511 16.2591 22.0306 15.9555 21.9957 15.6322C21.9609 15.309 21.7207 15.0485 21.2402 14.5276L20.1827 13.3749C19.9243 13.0558 19.7408 12.5 19.7408 11.9998C19.7408 11.5 19.9243 10.944 20.1828 10.625L21.2402 9.47231C21.7207 8.95137 21.9609 8.6909 21.9957 8.36768C22.0306 8.04446 21.8511 7.74083 21.4922 7.13358Z"
          stroke={initColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <Path
          d="M15.5457 11.9922C15.5457 13.9252 13.9385 15.4922 11.9559 15.4922C9.97339 15.4922 8.36621 13.9252 8.36621 11.9922C8.36621 10.0592 9.97339 8.49219 11.9559 8.49219C13.9385 8.49219 15.5457 10.0592 15.5457 11.9922Z"
          stroke={initColor}
          strokeWidth="1.5"
        />
      </Svg>
    );
  }

  if (name === "view") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M16 26C22.9036 26 28.5 16 28.5 16C28.5 16 22.9036 6 16 6C9.09644 6 3.5 16 3.5 16C3.5 16 9.09644 26 16 26Z"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.0002 20.8C18.6512 20.8 20.8002 18.6509 20.8002 16C20.8002 13.349 18.6512 11.2 16.0002 11.2C13.3492 11.2 11.2002 13.349 11.2002 16C11.2002 18.6509 13.3492 20.8 16.0002 20.8Z"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "refresh") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M30.6663 5.33335V13.3334M30.6663 13.3334H22.6663M30.6663 13.3334L24.4797 7.52002C23.0467 6.0863 21.2738 5.03896 19.3266 4.47572C17.3793 3.91247 15.3212 3.85169 13.3441 4.29903C11.367 4.74637 9.53541 5.68726 8.0203 7.03391C6.50519 8.38056 5.3559 10.0891 4.67967 12M1.33301 26.6667V18.6667M1.33301 18.6667H9.33301M1.33301 18.6667L7.51967 24.48C8.95267 25.9137 10.7255 26.9611 12.6728 27.5243C14.62 28.0876 16.6782 28.1484 18.6553 27.701C20.6324 27.2537 22.4639 26.3128 23.9791 24.9661C25.4942 23.6195 26.6435 21.911 27.3197 20"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "trash") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M4 8.00008H6.66667M6.66667 8.00008H28M6.66667 8.00008L6.66667 26.6667C6.66667 27.374 6.94762 28.0523 7.44772 28.5524C7.94781 29.0525 8.62609 29.3334 9.33333 29.3334H22.6667C23.3739 29.3334 24.0522 29.0525 24.5523 28.5524C25.0524 28.0523 25.3333 27.374 25.3333 26.6667V8.00008M10.6667 8.00008V5.33341C10.6667 4.62617 10.9476 3.94789 11.4477 3.4478C11.9478 2.9477 12.6261 2.66675 13.3333 2.66675H18.6667C19.3739 2.66675 20.0522 2.9477 20.5523 3.4478C21.0524 3.94789 21.3333 4.62617 21.3333 5.33341V8.00008M13.3333 14.6667V22.6667M18.6667 14.6667V22.6667"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "docs") {
    return (
      <Svg
        width={getSize()}
        height={getSize()}
        viewBox="0 0 32 32"
        fill={variant === "fill" ? initColor : "none"}>
        <Path
          d="M28 18.4922V8.33008C28 6.44446 28 5.50165 27.4142 4.91586C26.8284 4.33008 25.8856 4.33008 24 4.33008H8C6.11438 4.33008 5.17157 4.33008 4.58579 4.91586C4 5.50165 4 6.44446 4 8.33008V18.4922C4 20.3779 4 21.3207 4.58579 21.9065C5.17157 22.4922 6.11438 22.4922 8 22.4922H9.81864H10.127C10.3503 22.4922 10.5583 22.6058 10.679 22.7937C10.7709 22.9368 10.8036 23.1099 10.7704 23.2767L9.83757 27.9528C9.82543 28.0137 9.83739 28.0769 9.87094 28.1292C9.94229 28.2402 10.09 28.2726 10.2013 28.2017L18.168 23.1199L18.168 23.1199C18.6566 22.8082 18.901 22.6524 19.1753 22.5723C19.4497 22.4922 19.7395 22.4922 20.3191 22.4922H24C25.8856 22.4922 26.8284 22.4922 27.4142 21.9065C28 21.3207 28 20.3779 28 18.4922Z"
          fill={variant === "fill" ? initColor : "none"}
          stroke={initColor}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <Path
          d="M10 16.0058H18M10 10.8167H22"
          stroke={variant === "fill" ? "white" : initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === "delivery") {
    return (
      <Svg width={getSize()} height={getSize()} viewBox="0 0 32 32" fill="none">
        <Path
          d="M25.6169 21.7146L27.0001 21.7144C27.5524 21.7143 28 21.2667 28 20.7144V17.3657C28 17.1172 27.9075 16.8777 27.7406 16.6937L24.2976 12.8994C24.1081 12.6906 23.8391 12.5714 23.5571 12.5714H21C20.4477 12.5714 20 13.0191 20 13.5714V21.7143M25.6169 21.7146C25.3816 21.0486 24.7465 20.5714 24 20.5714M25.6169 21.7146C25.68 21.8933 25.7143 22.0855 25.7143 22.2857M24 20.5714C23.2535 20.5714 22.6184 21.0486 22.3831 21.7146M24 20.5714C24.9468 20.5714 25.7143 21.3389 25.7143 22.2857M24 20.5714C23.0532 20.5714 22.2857 21.3389 22.2857 22.2857M22.3831 21.7146L20 21.7143M22.3831 21.7146C22.32 21.8933 22.2857 22.0855 22.2857 22.2857M20 21.7143V9C20 8.44772 19.5523 8 19 8H4M20 21.7143L11.9026 21.7146M11.9026 21.7146C11.6673 21.0486 11.0323 20.5714 10.2857 20.5714M11.9026 21.7146C11.9657 21.8933 12 22.0855 12 22.2857M10.2857 20.5714C9.53918 20.5714 8.9041 21.0486 8.66886 21.7146M10.2857 20.5714C11.2325 20.5714 12 21.3389 12 22.2857M10.2857 20.5714C9.33894 20.5714 8.57143 21.3389 8.57143 22.2857M8.66886 21.7146L7.42857 21.7143M8.66886 21.7146C8.60576 21.8933 8.57143 22.0855 8.57143 22.2857M25.7143 22.2857C25.7143 23.2325 24.9468 24 24 24C23.0532 24 22.2857 23.2325 22.2857 22.2857M12 22.2857C12 23.2325 11.2325 24 10.2857 24C9.33894 24 8.57143 23.2325 8.57143 22.2857M8 14.8571H6.28571M8 18.2857H7.42857M8 11.4286H5.14286"
          stroke={initColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }
};

export default Icon;
