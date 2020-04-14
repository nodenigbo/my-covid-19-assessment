const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUsd: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospital: 1380614
};

const covid19ImpactEstimator = () => {
  const impact = {};
  const severeImpact = {};

  // Challange one

  // Calculating impact and severImpact for currently infected people

  impact.currentlyInfectedPeople = Math.trunc(data.reportedCases * 10);
  severeImpact.currentlyInfectedPeople = Math.trunc(data.reportedCases * 50);

  // Calculating based on Requested Time Elapsed

  let timeElapsed;
  switch (data.periodType.trim().toLowerCase()) {
    case 'months':
      timeElapsed = Math.trunc((data.timeElapsed * 30) / 3);
      break;
    case 'weeks':
      timeElapsed = Math.trunc((data.timeElapsed * 7) / 3);
      break;
    case 'days':
      timeElapsed = Math.trunc(data.timeElapsed / 3);
      break;
    default:
      break;
  }

  // time Elapsed as Infections grow

  impact.infectionsByRequestedTime = impact.currentlyInfectedPeople * (2 ** timeElapsed);
  severeImpact.infectionsByRequestedTime = (
    severeImpact.currentlyInfectedPeople * (2 ** timeElapsed));

  // Challange two

  const ImpactRequetTime = impact.infectionsByRequestedTime * 0.15;
  const severeImpactRequestTime = severeImpact.infectionsByRequestedTime * 0.15;

  impact.severCasesByRequestedTime = Math.trunc(ImpactRequetTime);
  severeImpact.severCasesByRequestedTime = Math.trunc(severeImpactRequestTime);

  const bedsAvailable = data.totalHospital * 0.35;
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
  const calculate = data.population * data.avgDailyIncomeInUsd;

  if (data.periodType === 'months') {
    newDay = data.timeToElapse * 30;
    impact.dollarsInFlight = (
      Math.trunc((impact.infectionsByRequestedTime * calculate) / newDay)
    );
    severeImpact.dollarsInFlight = (
      Math.trunc((severeImpact.infectionsByRequestedTime * calculate) / newDay)
    );
  } else if (data.periodType === 'weeks') {
    newDay = data.timeToElapse * 7;
    impact.dollarsInFlight = (
      Math.trunc((impact.infectionsByRequestedTime * calculate) / newDay)
    );
    severeImpact.dollarsInFlight = (
      Math.trunc((severeImpact.infectionsByRequestedTime * calculate) / newDay)
    );
  } else if (data.periodType === 'days') {
    newDay = data.timeToElapse * 1;
    impact.dollarsInFlight = (
      Math.trunc((impact.infectionsByRequestedTime * calculate) / newDay)
    );
    severeImpact.dollarsInFlight = (
      Math.trunc((severeImpact.infectionsByRequestedTime * calculate) / newDay)
    );
  }

  return {
    data,
    impact: {},
    severeImpact: {}
  };
};
export default covid19ImpactEstimator;
