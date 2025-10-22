// import React from 'react';
// import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
//
// export default function FavoriteIcon({isFavorite}: {isFavorite: boolean}) {
//   return (
//     <Svg width="36" height="36" fill="none" viewBox="0 0 36 36">
//       <Rect width="36" height="36" fill="#fff" rx="8" />
//       <G clipPath="url(#clip0_12_2657)">
//         <Path
//           {...(isFavorite ? {fill: '#7A71BA'} : {})}
//           stroke={'#838383'}
//           d="M22.583 9.597A5.334 5.334 0 0018 12.347a5.333 5.333 0 00-4.583-2.75A5.667 5.667 0 008 15.472c0 3.79 3.988 7.928 7.333 10.733a4.145 4.145 0 005.334 0C24.012 23.4 28 19.261 28 15.472a5.666 5.666 0 00-5.417-5.875zM19.596 24.93a2.477 2.477 0 01-3.192 0c-4.281-3.592-6.737-7.039-6.737-9.458a4 4 0 013.75-4.208 4 4 0 013.75 4.208.833.833 0 001.666 0 4 4 0 013.75-4.208 4 4 0 013.75 4.208c0 2.42-2.455 5.866-6.737 9.455v.003z"
//         />
//       </G>
//       <Defs>
//         <ClipPath id="clip0_12_2657">
//           <Path fill="#fff" d="M0 0H20V20H0z" transform="translate(8 8)" />
//         </ClipPath>
//       </Defs>
//     </Svg>
//   );
// }

import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

export default function FavoriteIcon({isFavorite = false}) {
  return (
    <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <Rect width="36" height="36" rx="8" fill="white" />
      <G clip-path="url(#clip0_123_339)">
        <Path
          d="M22.5833 9.59711C21.645 9.6117 20.7271 9.87365 19.9223 10.3565C19.1176 10.8393 18.4545 11.526 18 12.3471C17.5455 11.526 16.8825 10.8393 16.0777 10.3565C15.273 9.87365 14.355 9.6117 13.4167 9.59711C11.9208 9.6621 10.5114 10.3165 9.49649 11.4173C8.48156 12.5181 7.94355 13.9759 8.00001 15.4721C8.00001 19.2613 11.9883 23.3996 15.3333 26.2054C16.0802 26.833 17.0245 27.1771 18 27.1771C18.9755 27.1771 19.9198 26.833 20.6667 26.2054C24.0117 23.3996 28 19.2613 28 15.4721C28.0565 13.9759 27.5185 12.5181 26.5035 11.4173C25.4886 10.3165 24.0792 9.6621 22.5833 9.59711Z"
          {...(isFavorite ? {fill: '#7A71BA'} : {})}
          stroke={'#838383'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_123_339">
          <Rect
            width="20"
            height="20"
            fill="white"
            transform="translate(8 8)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}