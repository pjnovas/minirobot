/* TEST H Bridge (L293D) - 2 DC Motors

This is a script to test Arduino with 2 DC Motors driven by an L293D IC

ARDUINO   L293D IC        
  5          10
  6          15
  9          7
  10         2
  5V         1, 9, 16
  GND        4, 5, 12, 13
  
  Motor 1 pins 3 & 6 of L293D
  Motor 2 pins 11 & 14 of L293D

  PSU for Motors (9v or 5v depending of the motors used) 
  (-) to GND
  (+) pin 8 of L293D

*/

// These pins MUST be PWM~

int leftA = 5; 
int leftB = 6; 
int rightA = 9; 
int rightB = 10; 

int vel = 100; // motos speed (0-255)

void setup()  { 
  pinMode(rightA, OUTPUT);
  pinMode(rightB, OUTPUT);
  pinMode(leftA, OUTPUT);
  pinMode(leftB, OUTPUT);
} 
 
void loop()  { 
  
    // Stop motors
    analogWrite(rightB, 0);
    analogWrite(leftB, 0); 
    delay (500);

    // Forward 2 secs
    analogWrite(rightA, vel);  
    analogWrite(leftA, vel); 
    delay (2000);
   
    // Right 0,5 secs
    analogWrite(rightA, vel);  
    analogWrite(leftA, 0); 
    delay (500);
    
    // Left 0,5 secs
    analogWrite(rightA, 0);    
    analogWrite(leftA, vel); 
    delay (500);
     
    // Stop motors
    analogWrite(rightA, 0);    
    analogWrite(leftA, 0);
    delay (500);
    
    // Backwards 2 secs
    analogWrite(rightB, vel);  
    analogWrite(leftB, vel); 
    delay (2000);                      
}
