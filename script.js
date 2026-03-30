// Full Fraud Simulator with Decision Panel & Glow (Dropdown Quick Scenario Compatible)

function calculateRisk() {
  const amount = parseFloat(document.getElementById("amount").value);
  const location = parseInt(document.getElementById("location").value);
  const device = parseInt(document.getElementById("device").value);
  const frequency = parseInt(document.getElementById("frequency").value);

  const amountScore = Math.min(amount / 10000, 1);

  const riskScore =
    (amountScore * 0.4) +
    (location * 0.2) +
    (device * 0.2) +
    (Math.min(frequency / 10, 1) * 0.2);

  const riskPercent = Math.round(riskScore * 100);

  let riskLevel = "Low";
  if (riskPercent > 70) riskLevel = "High";
  else if (riskPercent > 40) riskLevel = "Medium";

  // Flags
  const flags = [];
  if (amount > 5000) flags.push("High transaction amount");
  if (location === 1) flags.push("International transaction");
  if (device === 1) flags.push("Unknown device");
  if (frequency > 5) flags.push("High transaction frequency");

  // Animate risk number
  const resultEl = document.getElementById("result");
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
  const bar = document.getElementById("riskFill");
  bar.style.width = riskPercent + "%";
  bar.style.background = riskPercent > 70 ? "red" :
                         riskPercent > 40 ? "orange" : "green";

  // Update flags
  const flagsList = document.getElementById("flags");
  flagsList.innerHTML = "";
  flags.forEach(f => {
    const li = document.createElement("li");
    li.innerText = f;
    flagsList.appendChild(li);
  });

  // Decision Panel with glow
  const decisionEl = document.getElementById("decision");
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

// Run scenario from dropdown
function runScenarioFromDropdown() {
  const select = document.getElementById("scenarioSelect");
  const value = select.value;
  if (!value) return;

  const [amount, location, device, frequency] = value.split(',').map(Number);

  document.getElementById("amount").value = amount;
  document.getElementById("location").value = location;
  document.getElementById("device").value = device;
  document.getElementById("frequency").value = frequency;

  calculateRisk();
}
