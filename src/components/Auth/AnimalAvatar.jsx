import {avatarChoices} from './animalAvatars'

const AnimalAvatar = ({type, size = 48}) => {
  const common = {stroke: '#27334a', strokeWidth: 2, strokeLinejoin: 'round'}

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={`${type} animal avatar`}>
      <defs>
        <clipPath id={`avatar-${type}`}><circle cx="50" cy="50" r="49" /></clipPath>
      </defs>
      <g clipPath={`url(#avatar-${type})`}>
        <rect width="100" height="100" fill={avatarChoices.find(item => item.id === type)?.background || '#e5e7eb'} />
        {type === 'fox' && <>
          <polygon points="18,43 20,5 46,30 54,30 80,5 83,44 76,75 50,97 24,75" fill="#dc713f" {...common} />
          <polygon points="21,13 39,31 27,37" fill="#f4c89a" /><polygon points="79,13 61,31 73,37" fill="#f4c89a" />
          <polygon points="26,53 44,60 50,91 29,73" fill="#fff1dc" /><polygon points="74,53 56,60 50,91 71,73" fill="#fff1dc" />
          <polygon points="32,47 43,49 40,54" fill="#263347" /><polygon points="68,47 57,49 60,54" fill="#263347" />
          <polygon points="46,66 54,66 50,71" fill="#263347" />
        </>}
        {type === 'cat' && <>
          <polygon points="18,43 20,8 43,28 57,28 80,8 83,44 76,76 50,94 24,76" fill="#755cc3" {...common} />
          <polygon points="24,18 38,31 27,38" fill="#f3b6c2" /><polygon points="76,18 62,31 73,38" fill="#f3b6c2" />
          <polygon points="28,48 43,50 39,55" fill="#202b40" /><polygon points="72,48 57,50 61,55" fill="#202b40" />
          <polygon points="46,65 54,65 50,70" fill="#e78c9c" />
          <path d="M25 66L43 68M24 73L42 71M75 66L57 68M76 73L58 71" stroke="#fff" strokeWidth="2" />
          <polygon points="30,59 47,61 50,86 28,76" fill="#f0e9ff" /><polygon points="70,59 53,61 50,86 72,76" fill="#f0e9ff" />
        </>}
        {type === 'wolf' && <>
          <polygon points="17,45 17,8 43,29 57,29 83,8 83,45 74,76 50,96 26,76" fill="#526e88" {...common} />
          <polygon points="21,17 39,32 26,38" fill="#d8e1e8" /><polygon points="79,17 61,32 74,38" fill="#d8e1e8" />
          <polygon points="27,49 44,51 40,56" fill="#182638" /><polygon points="73,49 56,51 60,56" fill="#182638" />
          <polygon points="25,61 48,60 50,91 31,76" fill="#dbe4e9" /><polygon points="75,61 52,60 50,91 69,76" fill="#dbe4e9" />
          <polygon points="45,67 55,67 50,73" fill="#263347" />
        </>}
        {type === 'panda' && <>
          <polygon points="28,28 19,15 34,10 45,23 55,23 66,10 81,15 72,29 79,48 74,74 50,93 26,74 21,48" fill="#f4f5f1" {...common} />
          <polygon points="20,31 10,17 25,9 38,25" fill="#263347" /><polygon points="80,31 90,17 75,9 62,25" fill="#263347" />
          <ellipse cx="37" cy="49" rx="11" ry="15" fill="#263347" transform="rotate(28 37 49)" /><ellipse cx="63" cy="49" rx="11" ry="15" fill="#263347" transform="rotate(-28 63 49)" />
          <circle cx="39" cy="49" r="3" fill="#fff" /><circle cx="61" cy="49" r="3" fill="#fff" />
          <polygon points="45,67 55,67 50,73" fill="#263347" />
        </>}
        {type === 'owl' && <>
          <polygon points="17,38 11,12 35,26 50,20 65,26 89,12 83,43 78,76 50,96 22,76" fill="#9c5e70" {...common} />
          <polygon points="20,20 37,31 26,39" fill="#f4c6a8" /><polygon points="80,20 63,31 74,39" fill="#f4c6a8" />
          <polygon points="22,52 34,35 48,48 46,66 31,68" fill="#f4e6cf" /><polygon points="78,52 66,35 52,48 54,66 69,68" fill="#f4e6cf" />
          <circle cx="38" cy="51" r="7" fill="#d98a43" /><circle cx="62" cy="51" r="7" fill="#d98a43" />
          <circle cx="38" cy="51" r="3" fill="#263347" /><circle cx="62" cy="51" r="3" fill="#263347" />
          <polygon points="45,62 55,62 50,70" fill="#e3a342" />
          <polygon points="28,73 50,69 72,73 50,91" fill="#dba978" />
        </>}
      </g>
    </svg>
  )
}

export default AnimalAvatar
