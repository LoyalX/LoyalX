//nfc:
  /*
  PINOUT:
  RC522 MODULE      MEGA
  SDA               D53
  SCK               D52
  MOSI              D51
  MISO              D50
  IRQ               N/A
  GND               GND
  RST               D5
  3.3V              3.3V
  */
  
/* Include the standard Arduino SPI library */
#include <SPI.h>
/* Include the RFID library */
#include <MFRC522.h>

/* Define the DIO used for the SDA (SS) and RST (reset) pins. */
#define SDA_DIO 53
#define RESET_DIO 5
/* Create an instance of the RFID library */
MFRC522 RC522(SDA_DIO, RESET_DIO); 

 int CardSerial[4];

//===================================================================
//keypad:
/*
PINOUT:
  keypad      MEGA
  1           D29
  2           D28
  3           D27
  4           D26
  5           D25
  6           D24
  7           D23
  8           D22
*/
#include <Keypad.h>

const byte ROWS = 4; //four rows
const byte COLS = 4; //four columns
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

byte rowPins[ROWS] = {22,23,24,25}; //connect to the row pinouts of the keypad
byte colPins[COLS] = {26,27,28,29}; //connect to the column pinouts of the keypad

Keypad keypad = Keypad( makeKeymap(keys), rowPins, colPins, ROWS, COLS );

unsigned char password=0;
char user;

//=================================================================================
  int a[4]={48,135,224,43};
  int pa=0;
  int b[4]={182,204,155,187};
  int pb=0;
//=================================================================================

void setup() {
  // your setup code here will be run once:
    Serial.begin(9600);
    
  //nfc
  /* Enable the SPI interface */
  SPI.begin(); 
  /* Initialise the RFID reader */
  RC522.PCD_Init();
  //LEDs & buzzer
  pinMode(A0, OUTPUT);//red
  pinMode(A1, OUTPUT);//green
  pinMode(A2, OUTPUT);//blue
  pinMode(A3, OUTPUT);//buzzer
}

void loop() {
  // your main code here will be run repeatedly:
  while(true){
    White();
    if(Read()){
        Blue();
        Buzzer(250);
        while(KeyPad())
          KeyPad();
    }
  }
}
