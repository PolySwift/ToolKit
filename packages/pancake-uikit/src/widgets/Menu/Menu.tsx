import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import Overlay from "../../components/Overlay/Overlay";
import Flex from "../../components/Box/Flex";
import { useMatchBreakpoints } from "../../hooks";
import Logo from "./components/Logo";
import Panel from "./components/Panel";
import UserBlock from "./components/UserBlock";
import { NavProps } from "./types";
import { HomeIcon, TradeIcon, FarmIcon, PoolIcon, InfoIcon, MoreIcon, TwitterIcon, TelegramIcon, TicketIcon, SunIcon, NomicsIcon } from "./icons";
import Dropdown from "../../components/Dropdown/Dropdown";
import Avatar from "./components/Avatar";
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
import Text from "../../components/Text/Text";
import Skeleton from "../../components/Skeleton/Skeleton";
import { LogoIcon } from "../../components/Svg";

const Ul = styled.ul`
  list-style: none;
  color: white;
  @media (max-width: 967px) {
    display: none;
  }
  li {
    display: inline-block;
  }
  li:not(:first-child) {
    margin-left: 20px;
  }
  li div a {
    padding: 5px 0;
    font-size: 14px;
  }
  li div a:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
  svg {
    fill: url(#MyGradient);
    vertical-align: middle;
    margin-top: -5px;
    margin-right: 4px;
  }
  .socialIcons svg {
    margin-right: -15px;
  }
`;

const DropdownLink = styled.div`
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.nav.background};
  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 20;
  transform: translate3d(0, 0, 0);
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    max-width: ${({ isPushed }) => `calc(100% - ${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px)`};
  }
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;
  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

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

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  links,
  profile,
  children,
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === true;
  const [isPushed, setIsPushed] = useState(!isMobile);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <Logo
          isPushed={isPushed}
          togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
          isDark={isDark}
          href={homeLink?.href ?? "/"}
        />
        <Ul>
          <li>
            <a href="/">
              <HomeIcon width="24px" mr="8px" />
              Home
            </a>
          </li>
          <li>
            <Dropdown
              target={
                <DropdownLink>
                  <TradeIcon width="24px" mr="8px" />
                  Trade
                </DropdownLink>
              }
            >
              <a target="_blank" rel="noreferrer" href="https://www.traderjoexyz.com/#/trade?outputCurrency=0x0Aa4ef05B43700BF4b6E6Dc83eA4e9C2CF6Af0fA">
                Exchange
              </a>
              <a target="_blank" rel="noreferrer" href="https://www.traderjoexyz.com/#/pool/avax/0x0Aa4ef05B43700BF4b6E6Dc83eA4e9C2CF6Af0fA">
                Liquidity
              </a>
            </Dropdown>
          </li>
          <li>
            <a href="/farms">
              <FarmIcon width="24px" mr="8px" />
              Farms
            </a>
          </li>
          <li>
            <a href="/pools">
              <PoolIcon width="24px" mr="8px" />
              Pools
            </a>
          </li>
          <li>
            <a href="/referrals">
              <SunIcon width="24px" mr="8px" />
              Referrals
            </a>
          </li>
          {/* <li>
            <a href="/lotteries">
              <TicketIcon width="24px" mr="8px" />
              Lotteries
            </a>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href="https://polyswift.info/">
              <InfoIcon width="24px" mr="8px" />
              Info
            </a>
          </li> */}
          <li>
            <Dropdown
              target={
                <DropdownLink>
                  <MoreIcon width="24px" mr="8px" />
                  More
                </DropdownLink>
              }
            >
              <a target="_blank" rel="noreferrer" href="https://github.com/polyswift/">
                Github
              </a>
              <a target="_blank" rel="noreferrer" href="https://docs.swiftfinance.farm/">
                Docs
              </a>
              <a target="_blank" rel="noreferrer" href="https://chartex.pro/?symbol=AVAX_TRADERJOE%3ASWIFT0x21b78f868bc7707C55470D6f7650faE23791F440&interval=60&theme=dark">
                Charts
              </a>
              <a target="_blank" rel="noreferrer" href="https://medium.com/@swiftfinance">
                Medium
              </a>
              <a target="_blank" rel="noreferrer" href="https://nomics.com/assets/SWIFT2-Swift-Finance">
                <NomicsIcon width="24px" mr="8px" />
                Nomics
              </a>

            </Dropdown>
          </li>
          <li className="socialIcons">
            <a target="_blank" rel="noreferrer" href="https://twitter.com/SwiftFinanceOff">
              <TwitterIcon width="24px" mr="0" />
            </a>
          </li>
          <li className="socialIcons">
            <a target="_blank" rel="noreferrer" href="https://t.me/swiftfinanceavax">
              <TelegramIcon width="24px" mr="0" />
            </a>
          </li>
        </Ul>
        {/* { cakePriceUsd ? (
          <PriceLink
          href="https://www.traderjoexyz.com/#/trade?outputCurrency=0x0Aa4ef05B43700BF4b6E6Dc83eA4e9C2CF6Af0fA"
          target="_blank"
          >
            <Text color="textSubtle" bold><img width="16" src="https://swiftfinance.farm/images/farms/swift.png" alt="Swift Token"/>{`$${cakePriceUsd.toFixed(3)}`}</Text>
          </PriceLink>
        ): 
        <Skeleton width={80} height={24} />
        } */}

        {!!login && !!logout && (
          <Flex>
            <UserBlock account={account} login={login} logout={logout} />
            {/* {profile && <Avatar profile={profile} />} */}
          </Flex>
        )}
      </StyledNav>
      <BodyWrapper>
        <Panel
          isPushed={isPushed}
          isMobile={isMobile}
          showMenu={showMenu}
          isDark={isDark}
          toggleTheme={toggleTheme}
          langs={langs}
          setLang={setLang}
          currentLang={currentLang}
          cakePriceUsd={cakePriceUsd}
          pushNav={setIsPushed}
          links={links}
        />
        <Inner isPushed={isPushed} showMenu={showMenu}>
          {children}
        </Inner>
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;