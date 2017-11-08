bool Read ()
{
  
  /* Has a card been detected? */
  if (RC522.PICC_IsNewCardPresent() && RC522.PICC_ReadCardSerial())
  {
    /* If so then get its serial number */
    
    Serial.println("Card detected:");
    Serial.println("%");
    for(int i =0 ; i<4;i++){
      CardSerial[i]=(int)RC522.uid.uidByte[i];
    }
     printDec(RC522.uid.uidByte, RC522.uid.size);
    
    
    Serial.println("&");
    Serial.println("Enter password and click A");
    Serial.println("%");
    return 1;
  }
  else
    return 0;
}

bool Login(int pass){
  if( CardSerial[0]==a[0] && CardSerial[1]==a[1] && CardSerial[2]==a[2] && CardSerial[3]==a[3] && pass==pa){
      user='a';
      //-------------------------------------------------------- MMagdy
     /* byte buffer[34];
  byte block;
  byte len;
  MFRC522::StatusCode status;
      Serial.setTimeout(20000L) ;     // wait until 20 seconds for input from serial
      // Ask personal data: Family name
      Serial.println(F("test keys input"));
      len = Serial.readBytes((char *) buffer, 42) ; // read family name from serial
      Serial.println(len);
      block = 1;
        //Serial.println(F("Authenticating using key A..."));
        MFRC522::MIFARE_Key key;
  for (byte i = 0; i < 6; i++) key.keyByte[i] = 0xFF;
  status = RC522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, block, &key, &(RC522.uid));
  if (status != MFRC522::STATUS_OK) {
    Serial.print(F("PCD_Authenticate() failed: "));
    Serial.println(RC522.GetStatusCodeName(status));
    return;
  }
  else Serial.println(F("PCD_Authenticate() success: "));
       // Write block
  status = RC522.MIFARE_Write(block, buffer, 16);
  if (status != MFRC522::STATUS_OK) {
    Serial.print(F("MIFARE_Write() failed: "));
    Serial.println(RC522.GetStatusCodeName(status));
    return;
  }
  else Serial.println(F("MIFARE_Write() success: "));
      */
      //-------------------------------------------
      return 1;
    }
  else if( CardSerial[0]==b[0] && CardSerial[1]==b[1] && CardSerial[2]==b[2] && CardSerial[3]==b[3] && pass==pb){
      user='b';
      return 1;
    }
    else 
      return 0;
}

void  printHex(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
   Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
  }
}

/**
 * Helper routine to dump a byte array as dec values to Serial.
 */
void printDec(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], DEC);
  }
}
