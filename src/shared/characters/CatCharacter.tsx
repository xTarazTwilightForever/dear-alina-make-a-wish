import './characters.css';

interface CatCharacterProps {
  character: 'white' | 'dark';
  className?: string;
}

/** Shared vector characters stay sharp at both postcard and game sizes. */
export function CatCharacter({ character, className = '' }: CatCharacterProps) {
  const white = character === 'white';
  const fur = white ? '#fffaf5' : '#51515c';
  const outline = white ? '#5c455b' : '#3d3a47';

  return (
    <svg
      className={`cat-character ${className}`}
      viewBox="0 0 200 240"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke={outline}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M145 215C195 230 204 173 171 177C190 195 171 208 155 198"
          fill={white ? '#372b67' : fur}
        />
        {white && (
          <path d="M178 181Q194 196 172 212" stroke="#db378f" strokeWidth="7" />
        )}
        <path
          d="M57 166C44 186 43 219 62 225H142C164 217 153 183 141 166"
          fill={fur}
        />
        <path
          d="M66 176L68 220M133 176L130 220"
          stroke={white ? '#e1cdd8' : '#6c6678'}
        />
        <path
          d="M59 204Q39 224 63 230H82Q94 216 83 205M120 205Q106 223 124 230H144Q163 221 144 205"
          fill={fur}
        />
        <path
          d="M43 87C24 71 19 37 24 16L76 47M126 48L175 10C185 37 177 71 159 88"
          fill={fur}
        />
        <path
          d="M36 36L62 59L42 77ZM147 57L168 30L158 77Z"
          fill="#efb6c8"
          stroke="none"
        />
        <path
          d="M46 70C65 43 133 39 156 69L174 100L165 109L178 116L166 125L172 139L154 143C138 171 66 174 44 145L24 140L33 127L22 119L34 109L28 99Z"
          fill={fur}
        />
        {white && (
          <>
            <path
              d="M38 76L47 43L78 45L85 24L107 35L123 24L139 46L162 65L139 64L146 87L120 78L106 91L87 72L64 86L67 66Z"
              fill="#302c63"
            />
            <path
              d="M89 32Q77 49 83 78L99 87Q95 57 113 34L103 33Z"
              fill="#ed3f9c"
              stroke="none"
            />
            <path d="M81 39L65 20L94 29" fill="#713285" stroke="none" />
            <path
              d="M37 130L17 151L42 147L32 164L54 153M165 117L181 131L167 138L181 149L157 151"
              fill="#633080"
            />
            <path
              d="M36 147L29 158L46 153M168 135L178 144L167 147"
              stroke="#ee3f98"
              strokeWidth="5"
            />
          </>
        )}
        {white ? (
          <>
            <path d="M53 98Q64 82 78 91M123 88Q139 80 150 96" />
            <ellipse
              cx="69"
              cy="115"
              rx="12"
              ry="19"
              fill="#28212e"
              stroke="none"
            />
            <ellipse
              cx="134"
              cy="113"
              rx="12"
              ry="19"
              fill="#28212e"
              stroke="none"
            />
            <ellipse
              cx="65"
              cy="107"
              rx="4"
              ry="6"
              fill="white"
              stroke="none"
            />
            <ellipse
              cx="130"
              cy="105"
              rx="4"
              ry="6"
              fill="white"
              stroke="none"
            />
            <path
              d="M41 137L46 127L50 136L56 126M146 134L151 124L155 133L161 123"
              stroke="#ee3c9b"
              strokeWidth="4"
            />
            <path
              d="M49 146L53 148L57 145M143 144L148 146L151 143"
              stroke="#d5b5d0"
              strokeWidth="4"
            />
          </>
        ) : (
          <>
            <path
              d="M55 111Q66 101 77 111M124 111Q135 101 146 111"
              stroke="#fff2e2"
              strokeWidth="4"
            />
            <ellipse
              cx="48"
              cy="130"
              rx="10"
              ry="5"
              fill="#d99aaa"
              stroke="none"
            />
            <ellipse
              cx="153"
              cy="130"
              rx="10"
              ry="5"
              fill="#d99aaa"
              stroke="none"
            />
            <path
              d="M145 65L154 46L165 61L179 54L179 75L160 70Z"
              fill="#c18a9c"
            />
          </>
        )}
        <path d="M96 128L102 132L107 127" fill="#d7839e" stroke="none" />
        <path
          d="M88 140Q96 148 102 140Q109 148 116 139"
          stroke={white ? '#5c455b' : '#fff2e2'}
          strokeWidth="2.5"
        />
        {white && (
          <>
            <path d="M78 167Q100 182 124 166" stroke="#725070" />
            <ellipse
              cx="102"
              cy="184"
              rx="10"
              ry="14"
              fill="#edc39f"
              strokeWidth="2"
            />
            <path
              d="M99 176L105 181L98 186L104 192"
              stroke="#514078"
              strokeWidth="3"
            />
          </>
        )}
      </g>
    </svg>
  );
}
