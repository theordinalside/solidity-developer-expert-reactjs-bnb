import { ethers } from "ethers";
// export const coreAdd = "0x62D7aA57125169101626a993fa46685313A774Ce";
// export const corePair = "0x3211227231BB246B0401d6CDD72abF3DB3A154F4";
// export const coreVault = "0x770C626B1f102f25f84BAd5CC06eD1b924D0854e";
// export const workingNetwork = "0x38";
// export const LgeEndDate = "04/10/2021 08:30:00 UTC";

export const coreAdd = "0x62D7aA57125169101626a993fa46685313A774Ce";
export const corePair = "0x3211227231bb246b0401d6cdd72abf3db3a154f4";
export const coreVault = "0xC3B146Fa646DC714011Ab50Fcd3a0Cfbb3C141C6";
export const workingNetwork = "0x38";
export const LgeEndDate = "04/10/2021 08:30:00 UTC";
export function toWeiDecimals(balanceOfWei, decimals) {
  if (balanceOfWei) {
    const balanceOfFromWei = ethers.utils.parseUnits(
      balanceOfWei.toString(),
      decimals
    );
    return balanceOfFromWei.toString();
  } else {
    return balanceOfWei;
  }
}
