 

type carType = 'Normal' | 'Motorcycle'| 'Truck'

class car {

    constructor (public autoType:carType,public plate:string){}

    cost(){
        let costPerHour=0;
        if (this.autoType==="Motorcycle"){
            costPerHour=5;
        }else {
            costPerHour=10;
        }
        return costPerHour
    }
}

class parkingSpot {
    constructor (public vehicle:car,public entranceTime:Date=new Date()){}
    cost (checkOutTime:Date):number {
        let hours =(checkOutTime.getTime()- this.entranceTime.getTime())/(1000*60*60);
        hours= Math.ceil(hours)
        if (hours<1){
            hours=1;
        }
        return hours* this.vehicle.cost();
    }
}
  
class parkingLot { 
   private spots:number;
   private occupiedSpots:parkingSpot[]=[];
   constructor(capacity:number=1000){
    this.spots=capacity;
   }

   checkIn (newCar:car){
    if (this.occupiedSpots.length<this.spots){
         const currentSpot = this.occupiedSpots.find(spot=> spot.vehicle.plate.toLowerCase() === newCar.plate.toLowerCase());
         if (currentSpot){
            throw new Error (`Sorry did you lost your ticket last time at ${currentSpot.entranceTime.toUTCString()}`)
         }
         const spot:parkingSpot = new parkingSpot(newCar);
         this.occupiedSpots.push(spot);
    }else {
        throw new Error('Sorry there are no more available spots')
    }
   }

   checkOut(plate:string):number{
    let cost:number=0;
    const currentSpot = this.occupiedSpots.find(spot=>spot.vehicle.plate.toLowerCase() === plate.toLowerCase());
    if (currentSpot){
       cost = currentSpot.cost(new Date());
       this.occupiedSpots= this.occupiedSpots.filter(spot=>spot.vehicle.plate.toLowerCase()!==plate.toLowerCase());
    }else {
        throw new Error('Sorry did you lost your ticket, please go to customer service');
    }
    return cost;

   }
}



// Tests 

try {
        const myParkingLot = new parkingLot();
        const firstVehicle = new car( 'Normal','abc123');
        const bike = new car( 'Motorcycle','bike1');
        myParkingLot.checkIn(firstVehicle);
        myParkingLot.checkIn(bike);

        
        console.log('I paid',myParkingLot.checkOut('abc123'));
         console.log('I paid',myParkingLot.checkOut('bike1'))
       // myParkingLot.checkIn(firstVehicle);

}
catch (error){
    console.error(error)
}


