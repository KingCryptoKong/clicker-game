import { useState } from "react";
import { UserProfileProps } from "../types/userProfileProps";
import { Stack, Tooltip, IconButton, Slider } from "@mui/material";
import { VolumeOff, VolumeDown, VolumeUp } from "@mui/icons-material";
import { defaultUserProfile } from "../constants";
import { useKeyDown } from "../hooks";

export const VolumeSlider = ({
  userProfile,
  setUserProfile,
}: UserProfileProps) => {
  const [previousValue, setPreviousValue] = useState<number>(
    defaultUserProfile.audioVolume
  );

  const handleMuteClick = () => {
    setPreviousValue(userProfile.audioVolume);
    userProfile.audioVolume === 0
      ? setUserProfile({
          ...userProfile,
          audioVolume: previousValue !== 0 ? previousValue : 1,
        })
      : setUserProfile({ ...userProfile, audioVolume: 0 });
  };

  const handleSliderChange = (e: Event, value: number | number[]) => {
    setUserProfile({
      ...userProfile,
      audioVolume: value as number,
    });
  };

  const volumeLabel = () => {
    const vol = Math.floor(userProfile.audioVolume * 100);
    return vol === 0 ? "Muted" : vol + "%";
  };
  // Adds a keyboard shortcut for muting/unmuting the volume.
  useKeyDown("m", handleMuteClick);

  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{
        mb: 1,
        width: "225px",
        marginLeft: "16px",
        background: "#ffffff2f",
        padding: "12px 24px 12px 18px",
        borderRadius: "16px",
        transition: ".3s all",
        ":hover": {
          background: "#ffffff35",
        },
        "@media (max-width: 600px)": {
          width: "180px",
          padding: "8px 18px 8px 9px",
        },
      }}
      alignItems="center"
    >
      <Tooltip title={userProfile.audioVolume === 0 ? "Unmute" : "Mute"}>
        <IconButton sx={{ color: "white" }} onClick={handleMuteClick}>
          {userProfile.audioVolume === 0 ? (
            <VolumeOff />
          ) : userProfile.audioVolume <= 0.5 ? (
            <VolumeDown />
          ) : (
            <VolumeUp />
          )}
        </IconButton>
      </Tooltip>
      <Slider
        sx={{
          width: "200px",
        }}
        value={userProfile.audioVolume}
        min={0}
        max={1}
        step={0.01}
        valueLabelFormat={volumeLabel}
        valueLabelDisplay="auto"
        onChange={handleSliderChange}
      />
    </Stack>
  );
};
