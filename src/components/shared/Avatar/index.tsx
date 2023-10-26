import { createAvatar } from '@dicebear/core'
import { identicon } from '@dicebear/collection'
import { generateUserColor } from '@/utils/generateUserColor'
import { AvatarWrapper } from './style'

interface IAvatarProps {
  seed: string
}

const Avatar = ({ seed }: IAvatarProps) => {
  const [avatar, setAvatar] = useState<string>('')

  const userColor = generateUserColor(seed)
  useEffect(() => {
    if (!seed) return
    async function generateAvatar() {
      const avatarDataUri = await createAvatar(identicon, {
        seed,
        // seed: 'random5',
        rowColor: [userColor as string],
      }).toDataUri()
      setAvatar(avatarDataUri)
    }
    generateAvatar()
  }, [seed, userColor])

  if (!avatar) return null

  return (
    <AvatarWrapper>
      <img src={avatar} alt={'avatar'} />
    </AvatarWrapper>
  )
}

export default Avatar
