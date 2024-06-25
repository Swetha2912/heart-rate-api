exports.processHeartRateData = (heartRateData) => {

    let data = heartRateData?.clinical_data?.HEART_RATE?.data
    data.sort((a, b) => new Date(a.on_date) - new Date(b.on_date));
  
    const result = [];
    let currentGroup = [];
    let groupStartTime = null;
  
    data.forEach(item => {
      const itemTime = new Date(item.on_date);
      
      if (!groupStartTime) {
        groupStartTime = itemTime;
      }
  
      const timeDiff = (itemTime - groupStartTime) / (1000 * 60); // difference in minutes
  
      if (timeDiff <= 15) {
        currentGroup.push(item);
      } else {
        if (currentGroup.length > 0) {
          const measurements = currentGroup.map(i => parseInt(i.measurement));
          result.push({
            from_date: currentGroup[0].on_date,
            to_date: currentGroup[currentGroup.length - 1].on_date,
            measurement: {
                 low: Math.min(...measurements),
              high: Math.max(...measurements)
            }
           
          });
        }

        currentGroup = [item];
        groupStartTime = itemTime;
      }
    });
  
    if (currentGroup.length > 0) {
      const measurements = currentGroup.map(i => parseInt(i.measurement));
      result.push({
        from_date: currentGroup[0].on_date,
        to_date: currentGroup[currentGroup.length - 1].on_date,
        
         measurement: {
                 low: Math.min(...measurements),
              high: Math.max(...measurements)
            }
      });
    }
  
    return result;
}