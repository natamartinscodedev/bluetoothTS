// Função para ativar o Bluetooth e conectar-se a um dispositivo
async function connectToBluetoothDevice() {
  try {
    // Solicita ao usuário para selecionar um dispositivo Bluetooth
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true, // Permite conectar a qualquer dispositivo
      optionalServices: ["battery_service"], // Serviços que você deseja acessar
    });

    console.log("Dispositivo selecionado:", device.name);

    // Conecta ao dispositivo selecionado
    const server = await device.gatt?.connect();
    console.log("Conectado ao dispositivo:", server);

    // (Opcional) Acessa o serviço de bateria como exemplo
    const batteryService = await server?.getPrimaryService("battery_service");
    if (batteryService) {
      const batteryLevelCharacteristic = await batteryService.getCharacteristic(
        "battery_level"
      );
      const batteryLevel = await batteryLevelCharacteristic.readValue();
      console.log("Nível de bateria:", batteryLevel.getUint8(0) + "%");
    }
  } catch (error) {
    console.error("Erro ao conectar ao dispositivo Bluetooth:", error);
  }
}

// Chamar a função ao clicar em um botão
const button = document.getElementById("connectBluetooth") as HTMLButtonElement;
button.addEventListener("click", () => {
  connectToBluetoothDevice();
});
