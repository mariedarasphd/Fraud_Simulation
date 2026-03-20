// Full Fraud Simulator with Decision Panel & Glow

function calculateRisk() {
  let amount = parseFloat(document.getElementById("amount").value);
  let location = parseInt(document.getElementById("location").value);
  let device = parseInt(document.getElementById("device").value);
  let frequency = parseInt(document.getElementById("frequency").value);

  let amountScore = Math.min(amount / 10000, 1);

  let riskScore =
    (amountScore * 0.4) +
    (location * 0.2) +
    (device * 0.2) +
    (Math.min(frequency / 10, 1) * 0.2);

  let riskPercent = Math.round(riskScore * 100);

  let riskLevel = "Low";
  if (riskPercent > 70) riskLevel = "High";
  else if (riskPercent > 40) riskLevel = "Medium";

  // Flags
  let flags = [];
  if (amount > 5000) flags.push("High transaction amount");
  if (location === 1) flags.push("International transaction");
  if (device === 1) flags.push("Unknown device");
  if (frequency > 5) flags.push("High transaction frequency");

  // Animate risk number
  let resultEl = document.getElementById("result");
  let current = 0;
  clearInterval(resultEl.interval);
  resultEl.interval = setInterval(() => {
    if (current >= riskPercent) {
      clearInterval(resultEl.interval);
    } else {
      current++;
      resultEl.innerText = `Risk Score: ${current}% (${riskLevel})`;
    }
  }, 10);

  // Animate risk bar
  let bar = document.getElementById("riskFill");
  bar.style.width = riskPercent + "%";

  if (riskPercent > 70) bar.style.background = "red";
  else if (riskPercent > 40) bar.style.background = "orange";
  else bar.style.background = "green";

  // Update flags
  let flagsList = document.getElementById("flags");
  flagsList.innerHTML = "";
  flags.forEach(f => {
    let li = document.createElement("li");
    li.innerText = f;
    flagsList.appendChild(li);
  });

  // Decision Panel with glow
  let decisionEl = document.getElementById("decision");
  if (riskPercent > 70) {
    decisionEl.innerText = "Block";
    decisionEl.style.background = "red";
    decisionEl.style.color = "white";
    decisionEl.style.animation = "pulse 1s infinite";
  } else if (riskPercent > 40) {
    decisionEl.innerText = "Review";
    decisionEl.style.background = "orange";
    decisionEl.style.color = "black";
    decisionEl.style.animation = "";
  } else {
    decisionEl.innerText = "Approve";
    decisionEl.style.background = "green";
    decisionEl.style.color = "white";
    decisionEl.style.animation = "";
  }
}

// Scenario buttons
function runScenario(amount, location, device, frequency) {
  document.getElementById("amount").value = amount;
  document.getElementById("location").value = location;
  document.getElementById("device").value = device;
  document.getElementById("frequency").value = frequency;

  calculateRisk();
}
