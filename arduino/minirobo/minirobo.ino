
// Serial ----------------------------------------
const long SERIAL_BAULRATE = 115200; // By Default baulrate for Bluetooth (HC05) is 9600, so if you didn't change it set that one

// WHEELS -------------------------------------

// PINS to Arduino (PWM~)
const byte leftA = 5; // Left Motor +
const byte leftB = 6; // Left Motor -
const byte rightA = 9; // Right Motor +
const byte rightB = 10; // Right Motor -


// Bluetooth Actions ---------------------------------------
const int BT_INPUT_SIZE = 10; // Max length for read chunks from bluetooth serial

int move_ONby = 0; // how many secs to be on
long move_snapshotON = 0; // started milli-secs

void move_ON(int time = 20) {
  move_snapshotON = millis();
  move_ONby = time*1000;
}

void checkMove() {
  if(move_ONby > 0 && (millis() - move_snapshotON  > move_ONby)){
    stopMotors();
    move_ONby = 0;
    move_snapshotON = 0;
  }
}

void stopMotors() {
  analogWrite(rightA, 0);
  analogWrite(leftA, 0); 
  analogWrite(rightB, 0);
  analogWrite(leftB, 0); 
}

void moveForward(int vel, int time) {
  //stopMotors();
  //move_ON(2);
  analogWrite(rightA, vel);  
  analogWrite(leftA, vel); 
}

void moveBackwars(int vel, int time) {
  //stopMotors();
  //move_ON(2);
  analogWrite(rightB, vel);  
  analogWrite(leftB, vel); 
}

void fireAction(int type, int value) {
  
  //showTextLCD(2, 2, "T: " + String(type) + " V: " + String(value));

  //if (type >= 50 && type < 100) { // Move
    stopMotors(); // Stop before move

    switch (type) {
      case 10: // Move Forward
        stopMotors();
      break; 
      case 60: // Move Forward
        moveForward(value, 2000);
      break; 
      case 70: // Move Backwards
        moveBackwars(value, 2000);
      break; 
    }    
  //}
 
}

void bluetooth_loop() {
  while(Serial.available() > 0) {

    char input[BT_INPUT_SIZE + 1];
    // Get next command from Serial (add 1 for final 0)
    byte size = Serial.readBytes(input, BT_INPUT_SIZE);
    input[size] = 0; // Add the final 0 to end the C string

    // Read each command pair 
    char* command = strtok(input, "&"); // & is the command separator
    
    while (command != 0) {
      // Split the command in two values
      char* separator = strchr(command, ':');
      if (separator != 0) {
        // string splitted into X: replace ':' with 0
        *separator = 0;
        int type = atoi(command);
        
        ++separator;
        int value = atoi(separator);
        
        fireAction(type, value);
      }
      
      // Find the next command in input string
      command = strtok(0, "&");
    }

  }
}

void setup() {

  //START A SERIAL SESSION
  Serial.begin(SERIAL_BAULRATE);

  //INITIALIZE THE ARDUINO PINS FOR INPUT/OUTPUT
  pinMode(leftA, OUTPUT);
  pinMode(leftB, OUTPUT);
  pinMode(rightA, OUTPUT);
  pinMode(rightB, OUTPUT);
}

void loop() {
  bluetooth_loop();
  checkMove();
}
