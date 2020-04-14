const covid19ImpactEstimator = (data) => {
  const {
      region: {
          avgDailyIncomeInUsd 
      },
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospital
  } = data;  
  const impact = {};
  const severImpact = {};
    
  // Challange one
  //calculating impact and severImpact for currently infected people  
  impact.currentlyInfectedPeople = Math.trunc( reportedCases * 10);
  severeImpact.currentlyInfectedPeople = Math.trunc( reportedCases * 50);  
  // Calculating based on Requested Time Elapsed  
  let timeElapsed;  
  switch (periodType.trim().toLowerCase()) {
      case 'days':
          timeElapsed = Math.trunc(timeElapsed / 3);
          break;
      case 'weeks':
          timeElapsed = Math.trunc((timeElapsed * 7) / 3);
          break;
      case 'months':
          timeElapsed = Math.trunc((timeElapsed * 30 ) / 3);
           break;
       default:
           break;
   }

  //time Elapsed as Infections grow
  impact.infectionsByRequestedTime = impact.currentlyInfectedPeople * (2 ** timeElapsed);
  severImpact.infectionsByRequestedTime = severImpact.currentlyInfectedPeople * (2 ** timeElapsed);  
  // Challange two  
  const ImpactRequetTime  = impact.infectionsByRequestedTime * 0.15;
  const severeImpactRequestTime = severeImpact.infectionsByRequestedTime * 0.15;  
  impact.severCasesByRequestedTime = Math.trunc(ImpactRequetTime);
  severeImpact.severCasesByRequestedTime = Math.trunc(severeImpactRequestTime);  
  const bedsAvailable = totalHospital * 0.35;
  const impactHospitalBedValue = bedsAvailable - ImpactRequetTime;
  const severeImpactHospitalValue = bedsAvailable - severeImpactRequestTime;  
  impact.hospitalBedsByRequestedTime = Math.trunc(impactHospitalBedValue);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(severeImpactHospitalValue);

  // Challange Three

  const impactCasesForICUCases = impact.infectionsByRequestedTime * 0.05;
  const severeImpactCasesForICUCases = severeImpact.infectionsByRequestedTime * 0.05;
  const impactVentillatorCases = impact.infectionsByRequestedTime * 0.02;
  const severeImpactVentillatorCases = severeImpact.infectionsByRequestedTime * 0.02;  
  impact.casesForICUByRequestedTime = Math.trunc(impactCasesForICUCases);
  severeImpact.casesForICUByRequestedTime = Math.trunc(severeImpactCasesForICUCases);  
  impact.casesForVentillatorsByRequestedTime = Math.trunc(impactVentillatorCases);
  severeImpact.casesForVentillatorsByRequestedTime = Math.trunc(severeImpactVentillatorCases);  
  let newDay;
  const calculate = population * avgDailyIncomeInUsd;
  if(periodType === 'days') {
      newDay = timeToElapse * 1;
      impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime * calculate) / newDay);
      severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime * calculate) / newDay);

  }
  else if(periodType === 'weeks') {
      newDay = timeToElapse * 7;
      impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime * calculate) / newDay);
      severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime * calculate) / newDay);
  }
  else if(periodType === 'months') {
      newDay = timeToElapse * 30;
      impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime * calculate) / newDay);
      severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime * calculate) / newDay);
  }  
  return {
      data,
      impact,
      severeImpact
  };
};

export default covid19ImpactEstimator;
