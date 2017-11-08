bool KeyPad(){
  int key;
  key = keypad.getKey(),DEC;
  key-=48;
  int A=17,B=18,C=19,D=20;
  
  //-------------------------------
  if (key==0 || key==1 || key==2 || key==3 || key==4 || key==5 || key==6 || key==7 || key==8 || key==9)
    return Enter(key);
  //-------------------------------
  else if (key==A)
    return Accept();
  //-------------------------------
  else if (key==B)
    return Back();
  //-------------------------------
  else if (key==C)
    return Change();
  //-------------------------------
  else if (key==D)
    return Delete();
  //-------------------------------  
}
//=======================================================================================================  
bool Enter(int num){
  Serial.print(num);
  Serial.println("%");
  Buzzer(50);
  password*=10;
  password+=num;
  return 1;
}
//=======================================================================================================
bool Accept(){
  Serial.println();
  bool L=Login(password);
  if(L){
    //------------------------------------------
    //--------------------------------
    Serial.println("done");
    Serial.println("%");
    Sign('G',150);
    delay(25);
    Sign('G',300);
    password=0;
    return 0;
  }
    
  else{
      Serial.println("wrong try agin");
      Serial.println("%");
      password=0;
      Sign('R',500);
      Blue();
      password=0;
      return 1;
  }
}
//=======================================================================================================
bool Back(){
  Serial.println("Back");
  Serial.println("%");
  Sign('R',300);
  delay(25);
  Sign('R',150);
  White();
  password=0;
  return 0;
}
//=======================================================================================================
bool Change(){
    Serial.println("Change password");
    Serial.println("Enter the last password and click A or C:");
    Serial.println("%");
    Sign('G',150);
    delay(50);
    Sign('G',250);
    Blue();
    int A=17,B=18,C=19,D=20;
    
    while(true){
      int key;
      key = keypad.getKey(),DEC;
      key-=48;
    
      if (key==0 || key==1 || key==2 || key==3 || key==4 || key==5 || key==6 || key==7 || key==8 || key==9)
        Enter(key);
      
      else if (key==D)
        Delete();
      
      else if (key==B){
        Serial.println("Back");
        Serial.println("%");
        Sign('R',150);
        delay(50);
        Sign('R',250);
        Blue();
        password=0;
        Serial.println("Enter password and click A");
        Serial.println("%");
        return 1;
      }
      else if(key==A || key==C){
        if (Login(password)){
          Serial.println("Correct , Enter new password and click A or C");
          Serial.println("%");
          Sign('G',150);
          delay(25);
          Sign('G',300);
          Green();
          while(true){
            int key;
            key = keypad.getKey(),DEC;
            key-=48;
            
            if (key==0 || key==1 || key==2 || key==3 || key==4 || key==5 || key==6 || key==7 || key==8 || key==9)
              Enter(key);
                
            else if (key==D)
              Delete();

            else if (key==B){
              Serial.println("Back");
              Serial.println("%");
              Sign('R',150);
              delay(50);
              Sign('R',250);
              Blue();
              password=0;
              Serial.println("Enter password and click A");
              Serial.println("%");
              return 1;
            }
               
            else if (key==A || key==C){
              if(user=='a')
                pa=password;
              if(user=='b')
                pb=password;
              Sign('B',150);
              delay(25);
              Sign('B',300);
              Blue();
              Serial.println("done");
              Serial.println("Enter password and click A");
              Serial.println("%");
              return 1;
            }
          }
        }
        else{
          Serial.println("password is rong try again");
          Serial.println("%");
          Sign('R',500);
          Blue();
          password=0;
       }
     }
   }
 }  
//=======================================================================================================
bool Delete(){
  Serial.print("done");
  Serial.println("%");
  Buzzer(50);
  password/=10;
  return 1;
}
//=======================================================================================================
  /*else if (key==-6){
    Serial.println();
    Serial.println("Move left");
  }
  else if (key==-13){
    Serial.println();
    Serial.println("Move right");
  }*/


// A accept
// B back
// C change Password
// D delet
// * move left
// # move right
