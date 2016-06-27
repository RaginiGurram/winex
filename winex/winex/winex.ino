int red1=A0;
int blue1=A1;// for purple color,blue  ; row 1 column 1

int red2=A2; // for red color ; row1 column 2

int green1=A3; // for green color ; row1 column 3

int red3=A4; // for red color ; row2 column 1

int red4=A5;
int blue2=13;
int green2=12; // for purple,blue,green and white ;row 2 column2

int blue3=11;// for blue color ;row 2 column3

int green3=10;// for green color; row3 column1

int red5=9;//for red color ;row3 column2

int red6=8;
int blue4=7;// for purple and blue; row3 column3
int blue5=6;
byte serialByte;
void setup()
{
  Serial.begin(9600);
   pinMode(red1, OUTPUT );
  pinMode(red2,OUTPUT);
  pinMode(red3,OUTPUT);
   pinMode(red4, OUTPUT );
  pinMode(red5,OUTPUT);
  pinMode(red6,OUTPUT);
   pinMode(blue1, OUTPUT );
  pinMode(blue2,OUTPUT);
  pinMode(blue3,OUTPUT);
   pinMode(blue4, OUTPUT );
  pinMode(green1,OUTPUT);
  pinMode(green2,OUTPUT);
   pinMode(green3, OUTPUT );
   pinMode(blue5, OUTPUT );
   digitalWrite(red1, HIGH );
  digitalWrite(red2,HIGH);
  digitalWrite(red3,HIGH);
   digitalWrite(red4, HIGH );
  digitalWrite(red5,HIGH);
  digitalWrite(red6,HIGH);
   digitalWrite(blue1, HIGH );
  digitalWrite(blue2,HIGH);
  digitalWrite(blue3,HIGH);
   digitalWrite(blue4,HIGH  );
  digitalWrite(green1,HIGH);
  digitalWrite(green2,HIGH);
   digitalWrite(green3, HIGH );
   digitalWrite(blue5, HIGH );
}
 void loop()
 {
  if(Serial.available())
  {
    serialByte = Serial.read();
  }
  ledControl(serialByte);
}

int ledCount = 9;
int ledArr[10][3] ={
  {-111,-111,-111},
  {A0,6,A1}, //R B G
  {8,12,7}, //R G B
  {-111,-111,-111}, //B R G
  {A5,-111,13}, //R B G
  {A2,A3,9}, //R G B
  {A4,-111,-111}, //R G B
  {-111,-111,11}, //R G B
  {-111,-111,-111}, //R G B
  {-111,10,-111} //R B G
};

int k[] = {'a','b',
                        'c','d','e','f','g','h',
                        'i','j','k','l','m','n',
                        'o','p','q','r','s','t',
			'u','v','w','x','y','z',
                        'A','B','C','D','E','F',
                        'G','H','I','J','K','L',
                        'M','N','O','P','Q','R',
                        'S','T','U','V','W','X',
			'Y','Z','0','1','3','4'};

int v[] = {0,1,
			1000,1001,1010,1011,1020,1021,
			2000,2001,2010,2011,2020,2021,
			3000,3001,3010,3011,3020,3021,
			4000,4001,4010,4011,4020,4021,
			5000,5001,5010,5011,5020,5021,
			6000,6001,6010,6011,6020,6021,
			7000,7001,7010,7011,7020,7021,
			8000,8001,8010,8011,8020,8021,
			9000,9001,9010,9011,9020,9021};

void ledControl(int key)
{
  //Serial.print(key);

  for(int i = 0;i<56;i++)
    if(key == k[i]){    
       int val = v[i];
       int LH = val%2==1?0:1;
    if(val == 0 || val == 1){
        for(int i = 1;i<=ledCount;i++)
          for(int j = 0;j<3;j++){
            int pin = ledArr[i][j];
            if(pin != -111)
              digitalWrite(pin,LH);
          }
       return;
    } 
       Serial.println(ledArr[val/1000][val%100/10]);
       digitalWrite(ledArr[val/1000][val%100/10],LH);
       return;
    }
  
/*  if(key == 'o'){
      for(int i = 1;i<=ledCount;i++)
        for(int j = 0;j<3;j++){
          int pin = ledArr[i][j];
          if(pin != -111)
            digitalWrite(pin,LOW);
        }
  } 
  else if(key == 'r'){
      for(int i = 1;i<=ledCount;i++)
        for(int j = 0;j<3;j++){
          int pin = ledArr[i][j];
          if(pin != -111)
            digitalWrite(pin,HIGH);
        }
  }*/ 
}



			

