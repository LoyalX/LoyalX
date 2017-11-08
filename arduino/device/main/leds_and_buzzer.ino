void LEDs (char C,int D){
  if(C=='R'){
    Red();
    delay(D);
    off();
  }
  else if(C=='G'){
    Green();
    delay(D);
    off();
  }
  else if(C=='B'){
    Blue();
    delay(D);
    off();
  }  
}
//====================================
void Buzzer(int D){
  digitalWrite(A3,1);
  delay(D);
  digitalWrite(A3,0);
}
//====================================
void Sign (char C,int D){
  if(C=='R'){
    Red();
    digitalWrite(A3,1);
    delay(D);
    digitalWrite(A3,0);
    off();
  }
  else if(C=='G'){
    Green();
    digitalWrite(A3,1);
    delay(D);
    digitalWrite(A3,0);
    off();
  }
  else if(C=='B'){
    Blue();
    digitalWrite(A2,1);
    delay(D);
    digitalWrite(A3,0);
  }
}
void White(){
  digitalWrite(A0,1);
  digitalWrite(A1,1);
  digitalWrite(A2,1);
}
void Red(){
  digitalWrite(A0,1);
  digitalWrite(A1,0);
  digitalWrite(A2,0);
}
void Green(){
  digitalWrite(A0,0);
  digitalWrite(A1,1);
  digitalWrite(A2,0);
}
void Blue(){
  digitalWrite(A0,0);
  digitalWrite(A1,0);
  digitalWrite(A2,1);
}
void off(){
  digitalWrite(A0,0);
  digitalWrite(A1,0);
  digitalWrite(A2,0);
}

