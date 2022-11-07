import React, { useState } from "react";
import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ onClose, discord, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordUser() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert("Discord copiado!", "Agora basta colar no Discord.");
    setIsCopping(false);
  }

  return (
    <Modal animationType="fade" statusBarTranslucent transparent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight={"bold"} />

          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={styles.title}
          />

          <Text style={styles.label}>Adicione seu discord</Text>

          <TouchableOpacity
            onPress={handleCopyDiscordUser}
            style={styles.discordButton}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
            <View
              style={{
                position: "absolute",
                right: "5%",
              }}
            >
              <Ionicons
                name="copy-outline"
                size={16}
                color={THEME.COLORS.TEXT}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
