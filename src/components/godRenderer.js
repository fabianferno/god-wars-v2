import React from "react";
// cards
import { parts } from "../parts/parts";
import _r1 from "../assets/images/rarity/_rarity_1.png";
import _r2 from "../assets/images/rarity/_rarity_2.png";
import _r3 from "../assets/images/rarity/_rarity_3.png";

const GodRenderer = ({ god = null, size = 200, style }) => {
  if (!god) {
    return null;
  }
  let rarity = _r1;

  if (god.rarity >= 80) {
    rarity = _r2;
  }
  if (god.rarity >= 95) {
    rarity = _r3;
  }

  let dnaStr = String(god.dna);

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

  let godDeatils = {
    bg: dnaStr.substring(0, 2) % 5,
    mask: dnaStr.substring(2, 4) % 5,
    line: dnaStr.substring(4, 6) % 5,
    addon: dnaStr.substring(6, 8) % 5,
    addonMouth1: dnaStr.substring(8, 10) % 5,
    addonMouth2: dnaStr.substring(10, 12) % 5,
    addonMouth3: dnaStr.substring(12, 14) % 5,
    name: god.name,
  };

  const godStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
  };

  return (
    <div
      style={{
        minWidth: size,
        minHeight: size,
        background: "blue",
        position: "relative",
        ...style,
      }}
    >
      <img alt={"bg"} src={parts.bg[godDeatils.bg]} style={godStyle} />
      <img alt={"mask"} src={parts.mask[godDeatils.mask]} style={godStyle} />
      <img alt={"line"} src={parts.line[godDeatils.line]} style={godStyle} />
      <img alt={"addon"} src={parts.addon[godDeatils.addon]} style={godStyle} />
      <img
        alt={"addon_mouth"}
        src={parts.addonMouth1[godDeatils.addonMouth1]}
        style={godStyle}
      />
      <img
        alt={"addon_mouth"}
        src={parts.addonMouth2[godDeatils.addonMouth2]}
        style={godStyle}
      />
      <img
        alt={"addon_mouth"}
        src={parts.addonMouth3[godDeatils.addonMouth3]}
        style={godStyle}
      />
      <img alt={"rarity"} src={rarity} style={godStyle} />
    </div>
  );
};

export default GodRenderer;
