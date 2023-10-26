import { nanoid } from 'nanoid'
import { useWeb3React } from '@web3-react/core'
import { AnimatePresence, type Variants } from 'framer-motion'
import data from '@emoji-mart/data'
import { motion } from 'framer-motion'
import Picker from '@emoji-mart/react'

import useSpinStore from '@/store/useSpinStore'
import { MAX_CHAT_MSG_LENGTH } from '@/constants/ws'
import { type IGameMessage } from '@/lib/ws/types/chatRoom'
import useAuthStore from '@/store/useAuthStore'
import { ensureString, shortenAddress } from '@/utils/text'

import { PNGS, SVGS } from '@/assets'

import { debounce } from '@/utils'
import { generateUserColor } from '@/utils/generateUserColor'
import {
  ChatBubble,
  BubbleHeader,
  Message,
  ChatList,
  ChatBubbles,
  SBottomScroller,
  ChatWrapper,
  ChatInputWrapper,
  SSendBtn,
  EmojiButton,
} from './style'
import { Input } from '../Input'
import Avatar from '../Avatar'

export const fadeInOutVariant: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
}

const chatMsgVariants = {
  initial: {
    y: '100%',
    transition: {
      opacity: 0,
      duration: 0.3,
      delay: 0.5,
    },
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.3,
      opacity: 1,
    },
  },
  exit: {
    transition: {
      opacity: 0,
      duration: 0.3,
      delay: 0.5,
    },
  },
}

export const Chat = () => {
  const { isActive } = useWeb3React()
  const { spinRoomWS, chatMessages, addChatMsg } = useSpinStore(state => ({
    spinRoomWS: state.spinRoomWS,
    chatMessages: state.chatMessages,
    addChatMsg: state.addChatMsg,
  }))
  const { username, authPublicAddress } = useAuthStore(state => ({
    username: state.username,
    authPublicAddress: state.authPublicAddress,
  }))
  const [msg, setMsg] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const chatBubblesRef = useRef<HTMLDivElement>(null)
  const debounceScrollRef = useRef<any>(null)
  const msgRef = useRef<any>(null)
  const [autoScroll, setAutoScroll] = useState(true)

  const scrollToBottom = useCallback(() => {
    chatBubblesRef.current?.scrollTo({
      top: chatBubblesRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [chatBubblesRef])

  useEffect(() => {
    if (chatBubblesRef.current && autoScroll) {
      scrollToBottom()
    }
  }, [chatMessages, autoScroll, scrollToBottom])

  const handleScroll = useCallback<React.UIEventHandler<HTMLDivElement>>(
    _ev => {
      // Debounce scroll so 'Scroll to bottom' doesn't appear when new messages come in
      if (debounceScrollRef.current) {
        debounceScrollRef.current()
        return
      }

      debounceScrollRef.current = debounce(() => {
        const { scrollTop, clientHeight, scrollHeight } = chatBubblesRef.current as HTMLDivElement
        const atBottom = scrollTop + clientHeight >= scrollHeight - 10
        setAutoScroll(atBottom)
      }, 200)
    },
    [setAutoScroll]
  )

  const onClickScrollToBottom = useCallback(() => {
    scrollToBottom()
    setAutoScroll(true)
  }, [scrollToBottom, setAutoScroll])

  const onMsgSubmission = useCallback(() => {
    if (ensureString(msg).trim().length === 0) return
    if (authPublicAddress) {
      spinRoomWS?.sendChatMsg(msg)
      // Optimistic UI update
      const newMsg: IGameMessage = {
        id: nanoid(),
        text: msg,
        username,
        createdBy: authPublicAddress,
        timestamp: Date.now(),
      }
      addChatMsg(newMsg)
      setMsg('')
      onClickScrollToBottom()
    } else {
      // @TODO: Toggle connect wallet modal
    }
  }, [msg, authPublicAddress, spinRoomWS, username, addChatMsg, onClickScrollToBottom])

  const onMsgChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMsg = ensureString(e.currentTarget.value)
      if (newMsg.length > MAX_CHAT_MSG_LENGTH) return

      setMsg(newMsg)
    },
    [setMsg]
  )

  const chatBubbles = useMemo(() => {
    return chatMessages.map(msg => {
      const displayName = msg.username ? msg.username : shortenAddress(msg.createdBy)
      const userColor = generateUserColor(msg.createdBy)
      return (
        <motion.div variants={chatMsgVariants} initial="initial" animate="animate" exit="exit">
          <ChatBubble key={msg.id} borderColor={userColor}>
            <BubbleHeader>
              <Avatar seed={msg.createdBy} /> <p>{displayName}</p>
            </BubbleHeader>
            <Message>
              <p>{msg.text}</p>
            </Message>
          </ChatBubble>
        </motion.div>
      )
    })
  }, [chatMessages])

  const handleEmojiSelect = (emoji: any) => {
    setShowEmojiPicker(false)
    const { selectionStart, selectionEnd } = msgRef.current
    const newMsg = msg.slice(0, selectionStart) + emoji.native + msg.slice(selectionEnd)
    setMsg(newMsg)
    msgRef.current.focus()
  }

  return (
    <ChatList>
      <AnimatePresence>
        <ChatBubbles ref={chatBubblesRef} onScroll={handleScroll}>
          {chatBubbles}
        </ChatBubbles>
        {!autoScroll && (
          <SBottomScroller
            key="bottom-scroller"
            onClick={onClickScrollToBottom}
            variants={fadeInOutVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <img src={SVGS.scrollIcon} alt="Scroll" />
          </SBottomScroller>
        )}
      </AnimatePresence>

      {showEmojiPicker ? (
        <Picker
          previewPosition="none"
          perLine={6}
          data={data}
          onEmojiSelect={handleEmojiSelect}
          theme={'dark'}
          autoFocus
          // onClickOutside={() => setShowEmojiPicker(false)}
        />
      ) : null}
      <ChatWrapper>
        <ChatInputWrapper>
          <Input
            customRef={msgRef}
            onChange={onMsgChange}
            value={msg}
            type="text"
            maxLength={MAX_CHAT_MSG_LENGTH}
            inputSuffix={
              <>
                <EmojiButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  <img src={PNGS.emojiIcon} />
                </EmojiButton>
                <SSendBtn
                  style={{ marginRight: 0 }}
                  disabled={!authPublicAddress}
                  type="button"
                  onClick={() => onMsgSubmission()}
                >
                  Send
                </SSendBtn>
              </>
            }
            onEnter={_e => onMsgSubmission()}
            placeholder={isActive ? 'Type a message...' : 'Connect your wallet'}
          />
        </ChatInputWrapper>
      </ChatWrapper>
    </ChatList>
  )
}
