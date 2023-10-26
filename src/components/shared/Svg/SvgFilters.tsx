export const WheelSvgDefs = () => (
  <defs>
    <clipPath id="#wheel-area">
      <path fill="#fff" d="M0 0h524v524H0z" />
    </clipPath>
    <filter id="displacementFilter">
      <feTurbulence type="turbulence" baseFrequency="0.2" numOctaves="2" result="turbulence" />
      <feDisplacementMap
        in2="turbulence"
        in="SourceGraphic"
        scale="10"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
    <filter
      id="tick-glow"
      filterUnits="userSpaceOnUse"
      x="-50%"
      y="-50%"
      width="200%"
      height="200%"
    >
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur10" />
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur20" />
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur30" />
      <feMerge result="blur-merged">
        <feMergeNode in="blur10" />
        <feMergeNode in="blur20" />
        <feMergeNode in="blur30" />
      </feMerge>
      <feColorMatrix
        result="glow-blur"
        in="blur-merged"
        type="matrix"
        values="0 0 0 0 0.139216 0 0 0 0 0.0152941 0 0 0 0 0.196078 0 0 0 1 0"
      />
      <feMerge>
        <feMergeNode in="glow-blur" />
        <feMergeNode in="blur-merged" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter
      id="focused-glow"
      filterUnits="userSpaceOnUse"
      x="-50%"
      y="-50%"
      width="200%"
      height="200%"
    >
      <feMorphology operator="dilate" in="SourceAlpha" radius="2" result="expanded" />
      <feGaussianBlur in="expanded" stdDeviation="5" result="blur" />
      <feFlood floodColor="#00ffcc" result="glowColor" />
      <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
      <feColorMatrix in="SourceGraphic" type="saturate" values="3" result="saturated" />
      <feComposite in="glow" in2="saturated" operator="over" />
    </filter>
    <filter
      id="tick-spin-glow"
      filterUnits="userSpaceOnUse"
      x="-50%"
      y="-50%"
      width="200%"
      height="200%"
    >
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur10" />
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur20" />
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur30" />
      <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur50" />
      <feMerge result="blur-merged">
        <feMergeNode in="blur10" />
        <feMergeNode in="blur20" />
        <feMergeNode in="blur30" />
        <feMergeNode in="blur50" />
      </feMerge>
      <feColorMatrix
        result="glow-blur"
        in="blur-merged"
        type="matrix"
        values="0 0 0 0 0.139216 0 0 0 0 0.0152941 0 0 0 0 0.196078 0 0 0 1 0"
      />
      <feMerge>
        <feMergeNode in="glow-blur" />
        <feMergeNode in="blur-merged" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.15" result="blurred"></feGaussianBlur>
      <feMerge>
        <feMergeNode in="blurred" />
        <feMergeNode in="blurred" />
        <feMergeNode in="blurred" />
        <feMergeNode in="blurred" />
        <feMergeNode in="blurred" />
        <feMergeNode in="blurred" />
        <feMergeNode in="blurred" />
        <feMergeNode in="blurred" />
        <feMergeNode in="blurred" />
      </feMerge>
    </filter>
    {/* <filter id="bright-neon-glow" filterUnits="userSpaceOnUse"> */}
    {/*   <feMorphology operator="dilate" radius="2" in="SourceGraphic" result="dilated" /> */}
    {/*   <feGaussianBlur in="dilated" stdDeviation="8" result="blur1" /> */}
    {/*   <feGaussianBlur in="dilated" stdDeviation="10" result="blur2" /> */}
    {/*   <feComposite in="blur1" in2="blur2" operator="lighter" result="blur" /> */}

    {/*   <feColorMatrix */}
    {/*     in="SourceGraphic" */}
    {/*     result="white" */}
    {/*     type="matrix" */}
    {/*     values="0 0 0 1 0 */}
    {/*                          0 0 0 1 0 */}
    {/*                          0 0 0 1 0 */}
    {/*                          0 0 0 1 0" */}
    {/*   /> */}

    {/*   <feComposite in="blur" in2="white" operator="over" result="blur" /> */}
    {/* </filter> */}
    <filter id="bright-neon-glow" filterUnits="userSpaceOnUse">
      <feMorphology operator="dilate" radius="2" in="SourceGraphic" result="dilated" />
      <feGaussianBlur in="dilated" stdDeviation="8" result="blur1" />
      <feGaussianBlur in="dilated" stdDeviation="10" result="blur2" />
      <feComposite in="blur1" in2="blur2" operator="lighter" result="blur" />

      <feColorMatrix
        in="SourceGraphic"
        result="enhanced"
        type="matrix"
        values="1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 1 0"
      />

      <feComposite in="blur" in2="enhanced" operator="over" result="blur" />
    </filter>
    <filter id="white-glow">
      <feFlood result="flood" floodColor="#ffffff" floodOpacity="1"></feFlood>
      <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
      <feMorphology in="mask" result="dilated" operator="dilate" radius="2"></feMorphology>
      <feGaussianBlur in="dilated" result="blurred" stdDeviation="5"></feGaussianBlur>
      <feMerge>
        <feMergeNode in="blurred"></feMergeNode>
        <feMergeNode in="SourceGraphic"></feMergeNode>
      </feMerge>
    </filter>
  </defs>
)
