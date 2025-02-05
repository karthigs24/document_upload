// html {
//     background-color: rgba(0, 0, 0, 0); /* Transparent background */
//     display: block;
//     margin: 0px;
//     padding: 0px;
//   }
  
//   body {
//     background-color: rgba(0, 0, 0, 0); /* Transparent background */
//     display: block;
//     margin: 8px; /* Default margin */
//     padding: 0px;
//   }
  
//   #root {
//     background-color: rgba(0, 0, 0, 0); /* Transparent background */
//     display: block;
//     margin: 0px;
//     padding: 0px;
//   }
  
//   /* Styles for the one-tap wallet popup */
//   @keyframes slide-in-one-tap {
//       from {
//           transform: translateY(80px);
//       }
//       to {
//           transform: translateY(0px);
//       }
//   }
  
//   .trust-hide-gracefully {
//       opacity: 0;
//   }
  
//   .trust-wallet-one-tap .hidden {
//       display: none;
//   }
  
//   .trust-wallet-one-tap .semibold {
//       font-weight: 500;
//   }
  
//   .trust-wallet-one-tap .binance-plex {
//       font-family: 'Binance';
//   }
  
//   .trust-wallet-one-tap .rounded-full {
//       border-radius: 50%;
//   }
  
//   .trust-wallet-one-tap .flex {
//       display: flex;
//   }
  
//   .trust-wallet-one-tap .flex-col {
//       flex-direction: column;
//   }
  
//   .trust-wallet-one-tap .items-center {
//       align-items: center;
//   }
  
//   .trust-wallet-one-tap .space-between {
//       justify-content: space-between;
//   }
  
//   .trust-wallet-one-tap .justify-center {
//       justify-content: center;
//   }
  
//   .trust-wallet-one-tap .w-full {
//       width: 100%;
//   }
  
//   .trust-wallet-one-tap .box {
//       transition: all 0.5s cubic-bezier(0, 0, 0, 1.43);
//       animation: slide-in-one-tap 0.5s cubic-bezier(0, 0, 0, 1.43);
//       width: 384px;
//       border-radius: 15px;
//       background: #FFF;
//       box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
//       position: fixed;
//       right: 30px;
//       bottom: 30px;
//       z-index: 1020;
//   }
  
//   .trust-wallet-one-tap .header {
//       gap: 15px;
//       border-bottom: 1px solid #E6E6E6;
//       padding: 10px 18px;
//   }
  
//   .trust-wallet-one-tap .header .left-items {
//       gap: 15px
//   }
  
//   .trust-wallet-one-tap .header .title {
//       color: #1E2329;
//       font-size: 18px;
//       font-weight: 600;
//       line-height: 28px;
//   }
  
//   .trust-wallet-one-tap .header .subtitle {
//       color: #474D57;
//       font-size: 14px;
//       line-height: 20px;
//   }
  
//   .trust-wallet-one-tap .header .close {
//       color: #1E2329;
//       cursor: pointer;
//   }
  
//   .trust-wallet-one-tap .body {
//       padding: 9px 18px;
//       gap: 10px;
  
//   }
  
//   .trust-wallet-one-tap .body .right-items {
//       gap: 10px;
//       width: 100%;
//   }
  
//   .trust-wallet-one-tap .body .right-items .wallet-title {
//       color: #1E2329;
//       font-size: 16px;
//       font-weight: 600;
//       line-height: 20px;
//   }
  
//   .trust-wallet-one-tap .body .right-items .wallet-subtitle {
//       color: #474D57;
//       font-size: 14px;
//       line-height: 20px;
//   }
  
//   .trust-wallet-one-tap .connect-indicator {
//       gap: 15px;
//       padding: 8px 0;
//   }
  
//   .trust-wallet-one-tap .connect-indicator .flow-icon {
//       color: #474D57;
//   }
  
//   .trust-wallet-one-tap .loading-color {
//       color: #FFF;
//   }
  
//   .trust-wallet-one-tap .button {
//       border-radius: 50px;
//       outline: 2px solid transparent;
//       outline-offset: 2px;
//       background-color: rgb(5, 0, 255);
//       border-color: rgb(229, 231, 235);
//       cursor: pointer;
//       text-align: center;
//       height: 45px;
//   }
  
//   .trust-wallet-one-tap .button .button-text {
//       color: #FFF;
//       font-size: 16px;
//       font-weight: 600;
//       line-height: 20px;
//   }
  
//   .trust-wallet-one-tap .footer {
//       margin: 20px 30px;
//   }
  
//   .trust-wallet-one-tap .check-icon {
//       color: #FFF;
//   }
  
//   @font-face {
//       font-family: 'Binance';
//       src: url(chrome-extension://egjidjbpglichdcondbcbdnbeeppgdph/fonts/BinancePlex-Regular.otf) format('opentype');
//       font-weight: 400;
//       font-style: normal;
//   }
  
//   @font-face {
//       font-family: 'Binance';
//       src: url(chrome-extension://egjidjbpglichdcondbcbdnbeeppgdph/fonts/BinancePlex-Medium.otf) format('opentype');
//       font-weight: 500;
//       font-style: normal;
//   }
  
//   @font-face {
//       font-family: 'Binance';
//       src: url(chrome-extension://egjidjbpglichdcondbcbdnbeeppgdph/fonts/BinancePlex-SemiBold.otf) format('opentype');
//       font-weight: 600;
//       font-style: normal;
//   }
//   /* Add this to your src/index.css */
//   .documents-area {
//     margin-top: 20px;
//     border-top: 1px solid #e0e0e0;
//     padding-top: 20px;
//   }
  
//   .documents-area h3 {
//     margin-bottom: 10px;
//   }
//   .p-tabview-nav li .p-button {
//     margin-left: auto;
//   }
//   .p-button.p-button-rounded.p-button-danger.p-button-text:hover {
//     background-color: #ffdddd; /* Light red background on hover */
//   }
  
// i dont want current document count and like that, i want to move the color of blue from document one to 1 when i click next, 1 to 2 of next applicant document then 2 to document one for from last to first