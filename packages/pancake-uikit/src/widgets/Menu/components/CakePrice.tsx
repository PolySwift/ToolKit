import React from "react";
import styled from "styled-components";
import { PancakeRoundIcon, LogoIcon } from "../../../components/Svg";
import Text from "../../../components/Text/Text";
import Skeleton from "../../../components/Skeleton/Skeleton";

interface Props {
  cakePriceUsd?: number;
  isDark: boolean

}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const CakePrice: React.FC<Props> = ({ cakePriceUsd
}) => {
  return cakePriceUsd ? (
    <PriceLink
      href="https://www.traderjoexyz.com/#/trade?outputCurrency=0x0Aa4ef05B43700BF4b6E6Dc83eA4e9C2CF6Af0fA"
      target="_blank"
    >
      <LogoIcon width="24px" mr="8px"/>
        {/* <Logo
          isDark={isDark}
          width="100px" mr="8px"
        /> */}
      <Text color="textSubtle" bold>{`$${cakePriceUsd.toFixed(3)}`}</Text>
    </PriceLink>
  ) : (
    <Skeleton width={80} height={24} />
  );
};

export default React.memo(CakePrice);