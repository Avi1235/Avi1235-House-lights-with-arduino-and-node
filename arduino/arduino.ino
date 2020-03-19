#define foco 8

#include <DHT.h>;

//Constants
#define DHTPIN 2     // what pin we're connected to
#define DHTTYPE DHT22   // DHT 22  (AM2302)
DHT dht(DHTPIN, DHTTYPE);
float temp;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(foco,OUTPUT);
  digitalWrite(foco,HIGH);
  dht.begin();
  
}

void loop() {
  // put your main code here, to run repeatedly:
  temp= dht.readTemperature();
  Serial.println(temp);
  if(Serial.available()!=0){
    digitalWrite(foco, Serial.read());//output received byte
  }
  delay(500);
}
