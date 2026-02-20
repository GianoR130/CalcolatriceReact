import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  // Funzione per gestire i numeri
  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  // Funzione per il punto decimale
  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // Funzione per le operazioni (+, -, *, /)
  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  // Funzione per calcolare il risultato
  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "*":
        return prev * current;
      case "/":
        return prev !== 0 ? prev / current : 0;
      case "%":
        return prev % current;
      case "^":
        return Math.pow(prev, current);
      default:
        return current;
    }
  };

  // Funzione per l'uguaglianza
  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  // Funzione per cancellare tutto
  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  // Funzione per il backspace
  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  // Funzione per i calcoli scientifici
  const handleScientific = (func: string) => {
    const value = parseFloat(display);
    let result = 0;

    switch (func) {
      case "sqrt":
        result = Math.sqrt(value);
        break;
      case "sin":
        result = Math.sin((value * Math.PI) / 180);
        break;
      case "cos":
        result = Math.cos((value * Math.PI) / 180);
        break;
      case "tan":
        result = Math.tan((value * Math.PI) / 180);
        break;
      case "log":
        result = Math.log10(value);
        break;
      case "ln":
        result = Math.log(value);
        break;
      case "+/-":
        result = -value;
        break;
      default:
        result = value;
    }

    setDisplay(String(result));
    setWaitingForNewValue(true);
  };

  const Button = ({
    label,
    onPress,
    style,
  }: {
    label: string;
    onPress: () => void;
    style?: object;
  }) => (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Titolo */}
      <Text style={styles.title}>Calcolatrice</Text>

      {/* Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1}>
          {display}
        </Text>
      </View>

      {/* Pulsanti Clear e Backspace */}
      <View style={styles.row}>
        <Button
          label="C"
          onPress={handleClear}
          style={styles.clearButton}
        />
        <Button
          label="⌫"
          onPress={handleBackspace}
          style={styles.clearButton}
        />
      </View>

      {/* Pulsanti scientifici */}
      <View style={styles.scientificRow}>
        <Button
          label="√"
          onPress={() => handleScientific("sqrt")}
          style={styles.scientificButton}
        />
        <Button
          label="sin"
          onPress={() => handleScientific("sin")}
          style={styles.scientificButton}
        />
        <Button
          label="cos"
          onPress={() => handleScientific("cos")}
          style={styles.scientificButton}
        />
        <Button
          label="log"
          onPress={() => handleScientific("log")}
          style={styles.scientificButton}
        />
      </View>

      <View style={styles.scientificRow}>
        <Button
          label="tan"
          onPress={() => handleScientific("tan")}
          style={styles.scientificButton}
        />
        <Button
          label="ln"
          onPress={() => handleScientific("ln")}
          style={styles.scientificButton}
        />
        <Button
          label="+/-"
          onPress={() => handleScientific("+/-")}
          style={styles.scientificButton}
        />
        <Button
          label="π"
          onPress={() => setDisplay(String(Math.PI))}
          style={styles.scientificButton}
        />
      </View>

      {/* Tastiera principale */}
      <View style={styles.row}>
        <Button label="%" onPress={() => handleOperation("%")} style={styles.functionButton} />
        <Button label="÷" onPress={() => handleOperation("/")} style={styles.operationButton} />
      </View>

      <View style={styles.row}>
        <Button label="7" onPress={() => handleNumber("7")} />
        <Button label="8" onPress={() => handleNumber("8")} />
        <Button label="9" onPress={() => handleNumber("9")} />
        <Button label="×" onPress={() => handleOperation("*")} style={styles.operationButton} />
      </View>

      <View style={styles.row}>
        <Button label="4" onPress={() => handleNumber("4")} />
        <Button label="5" onPress={() => handleNumber("5")} />
        <Button label="6" onPress={() => handleNumber("6")} />
        <Button label="−" onPress={() => handleOperation("-")} style={styles.operationButton} />
      </View>

      <View style={styles.row}>
        <Button label="1" onPress={() => handleNumber("1")} />
        <Button label="2" onPress={() => handleNumber("2")} />
        <Button label="3" onPress={() => handleNumber("3")} />
        <Button label="+" onPress={() => handleOperation("+")} style={styles.operationButton} />
      </View>

      <View style={styles.row}>
        <Button
          label="0"
          onPress={() => handleNumber("0")}
          style={styles.buttonZero}
        />
        <Button label="." onPress={handleDecimal} />
        <Button label="^" onPress={() => handleOperation("^")} style={styles.functionButton} />
        <Button
          label="="
          onPress={handleEquals}
          style={styles.equalsButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 16,
    justifyContent: "flex-end",
  },
  displayContainer: {
    backgroundColor: "#2d2d2d",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    minHeight: 80,
    justifyContent: "center",
  },
  displayText: {
    fontSize: 48,
    color: "#00ff00",
    fontWeight: "600",
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 8,
  },
  button: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#3d3d3d",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#555",
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
  },
  operationButton: {
    backgroundColor: "#ff9500",
  },
  functionButton: {
    backgroundColor: "#555",
  },
  equalsButton: {
    backgroundColor: "#4CAF50",
  },
  scientificRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 8,
  },
  scientificButton: {
    flex: 1,
    height: 50,
    backgroundColor: "#4a4a4a",
    fontSize: 18,
  },
  buttonZero: {
    flex: 2,
  },
  title: {
    fontSize: 32,
    color: "#00ff00",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 1,
  },
  clearButton: {
    backgroundColor: "#FF6B6B",
    flex: 1,
    height: 70,
    borderWidth: 2,
    borderColor: "#FF8B8B",
  },
});
