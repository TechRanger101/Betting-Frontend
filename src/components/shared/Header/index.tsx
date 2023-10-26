import { Link } from 'react-router-dom'
import { type AxiosError } from 'axios'
import { useWeb3React } from '@web3-react/core'
import { SVGS } from '@/assets'
import { BREAKPOINTS } from '@/design'
import useScreenSize from '@/hooks/useScreenSize'
import { useToast } from '@/hooks/useToast'
import {
  AccountWrapper,
  HeaderWrapper,
  MainHeader,
  RightHeader,
  HeaderStrip,
  LeftHeader,
  HeaderLink,
  HeaderLinkWrapper,
  StyledSelect,
  SelectItem,
  AddressWrapper,
  UsernameInput,
  ActionButtonWrapper,
} from './style'
import ConnectWallet from '../Wallet/ConnectWallet'
import useAuth from '../../../hooks/useAuth'
import { Divider } from '../Divider'
import { metamask, coinbaseWallet, walletConnect } from '../../../lib/crypto/connectors'
import {
  shortenAddress,
  isValidUsername,
  ensureString,
  INVALID_USERNAME_MSG,
} from '../../../utils/text'
import { Input } from '../Input'
import Avatar from '../Avatar'

export const Header = () => {
  return (
    <HeaderWrapper>
      <MainHeader>
        <LeftMainHeader />
        <RightMainHeader />
      </MainHeader>
      <HeaderStrip />
    </HeaderWrapper>
  )
}

const LeftMainHeader = () => {
  const location = useLocation()
  const { width } = useScreenSize()

  const headerLinks = useMemo(() => {
    return [
      {
        img: SVGS.spinIcon,
        path: '/spin',
        isActive: location.pathname === '/spin',
      },
      {
        img: SVGS.diceIcon,
        path: '/dice',
        isActive: location.pathname === '/dice',
      },
      {
        img: SVGS.plinkoIcon,
        path: '/plinko',
        isActive: location.pathname === '/plinko',
      },
      {
        img: SVGS.bombIcon,
        path: '/bomb',
        isActive: location.pathname === '/bomb',
      },
      {
        img: SVGS.slotsIcon,
        path: '/slots',
        isActive: location.pathname === '/slots',
      },
    ]
  }, [location])

  return (
    <LeftHeader>
      {/* <img src={SVGS.logoIcon} alt="fareplay-logo" /> */}
      <img src={SVGS.oneLineFpLogo} alt="fareplay-logo" />
      {width <= BREAKPOINTS.lg && (
        <>
          <Divider />
          <HeaderLinkWrapper>
            {headerLinks.map((link, i) => (
              <HeaderLink
                isActive={link.isActive}
                key={link.path}
                transition={{
                  duration: 0.25,
                  delay: (i + 1) * 0.1,
                  ease: 'easeIn',
                }}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                <Link to={link.path}>
                  <img src={link.img} />
                </Link>
              </HeaderLink>
            ))}
          </HeaderLinkWrapper>
        </>
      )}
    </LeftHeader>
  )
}

const RightMainHeader = () => {
  const {
    isAuthed,
    logout,
    isWeb3Active: isActive,
    authApi,
    username: storeUsername,
    setUsername: setStoreUsername,
    authPublicAddress,
  } = useAuth()
  const [isEdit, setEdit] = useState<boolean>(false)
  const [isSavingName, setIsSavingName] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const { addToast } = useToast()
  const navigate = useNavigate()
  const { chainId, provider } = useWeb3React()

  // TODO: Need to create a hook that changes activate connector target based on enum
  // Just defaulting this to Metamask for now
  const deactivate = useCallback(async () => {
    if (!isActive) return

    await metamask.deactivate?.()
    await metamask.resetState?.()
    await coinbaseWallet.deactivate?.()
    await walletConnect.deactivate?.()
  }, [isActive])

  const showConnectWallet = useMemo(() => !isAuthed || !isActive, [isAuthed, isActive])

  const deactiveAndLogout = useCallback(async () => {
    try {
      await deactivate()
      await logout()
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }, [deactivate, logout, navigate])

  const options = [
    {
      label: 'EDIT USERNAME',
      // label: 'Edit username',
      value: () => setEdit(true),
    },
    {
      label: 'DISCONNECT',
      // label: 'Disconnect',
      value: deactiveAndLogout,
    },
  ]

  const networkOptions = [
    {
      label: 'SWITCH NETWORK',
      // label: 'Edit username',
      value: () => authApi.addAndSwitchNetwork(),
    },
    {
      label: 'DISCONNECT',
      // label: 'Disconnect',
      value: deactiveAndLogout,
    },
  ]

  const onCancel = useCallback(() => {
    setUsername(storeUsername)
    setEdit(false)
  }, [storeUsername])

  // @TODO: Need to add error messages for username validation and username already taken
  const onSave = useCallback(
    async (username: string) => {
      setIsSavingName(true)
      try {
        const cleanUsername = ensureString(username).trim()
        if (!isValidUsername(cleanUsername)) {
          throw new Error(INVALID_USERNAME_MSG)
        }

        const response = await authApi.setUserData({ username: cleanUsername })
        addToast({
          header: 'CHANGED USERNAME',
          subheader: `${cleanUsername}`,
          type: 'success',
        })
        setStoreUsername(cleanUsername)
      } catch (err) {
        console.error(err)
        addToast({
          header: 'CHANGE USERNAME FAILED',
          subheader: (err as AxiosError).message,
          type: 'error',
        })
        setUsername(storeUsername)
      } finally {
        setIsSavingName(false)
        setEdit(false)
      }
    },
    [addToast, authApi, setStoreUsername, storeUsername]
  )

  const onBlurInput = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (event.relatedTarget?.id === 'save-username-btn') return
      event.currentTarget.blur()
      onCancel()
    },
    [onCancel]
  )

  const onClickSaveBtn = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      onSave(username)
    },
    [username, onSave]
  )

  const shortAddr = useMemo(() => shortenAddress(authPublicAddress), [authPublicAddress])
  const walletSelectButton = useMemo(() => {
    if (chainId !== Number(import.meta.env.VITE_TEST_CHAIN_ID))
      return (
        <StyledSelect
          contentRenderer={() => (
            <AddressWrapper>
              <span>Wrong network ⚠️</span>
            </AddressWrapper>
          )}
          values={networkOptions}
          options={networkOptions}
          itemRenderer={({ item }) => (
            <SelectItem onClick={() => (item as any).value()}>{(item as any).label}</SelectItem>
          )}
          onChange={() => undefined}
        />
      )
    return (
      <StyledSelect
        contentRenderer={() => (
          <AddressWrapper>
            <p>{storeUsername || shortAddr}</p>
            <Avatar seed={authPublicAddress || ''} />
          </AddressWrapper>
        )}
        values={options}
        options={options}
        itemRenderer={({ item }) => (
          <SelectItem onClick={() => (item as any).value()}>{(item as any).label}</SelectItem>
        )}
        onChange={() => undefined}
      />
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortAddr, chainId, provider, isAuthed, isActive])

  useEffect(() => {
    if (storeUsername) {
      setUsername(storeUsername)
    }
  }, [storeUsername])

  if (showConnectWallet) return <ConnectWallet />

  return (
    <>
      <RightHeader>
        <AccountWrapper>
          {isEdit ? (
            <UsernameInput>
              <Input
                onChange={e => setUsername(e.target.value)}
                value={username}
                maxLength={12}
                onEnter={() => onSave(username)}
                onBlur={onBlurInput}
                autoFocus
                inputPrefix={<Avatar seed={authPublicAddress || ''} />}
                inputSuffix={
                  <ActionButtonWrapper>
                    <button id="save-username-btn" onClick={onClickSaveBtn}>
                      <img src={SVGS.checkIcon} alt="save" />
                    </button>
                    <button onClick={() => onCancel()}>
                      <img src={SVGS.crossIcon} alt="cancel" />
                    </button>
                  </ActionButtonWrapper>
                }
              />
            </UsernameInput>
          ) : (
            walletSelectButton
          )}
        </AccountWrapper>
      </RightHeader>
    </>
  )
}
