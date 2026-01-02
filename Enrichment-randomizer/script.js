const defaultWeeklyItems = [
    'Puzzle feeders',
    'Scent trails',
    'New toys rotation',
    'Training sessions'
];

const defaultDailyItems = [
    'Food scatter',
    'Ice treats',
    'Cardboard boxes',
    'Paper bags',
    'Hay bundle',
    'Scent enrichment',
    'Mirror time',
    'Musical instruments',
    'Bubble machine',
    'New browse material',
    'Paint activity',
    'Sand pit exploration',
    'Water spray',
    'Hanging vegetables',
    'Texture boards',
    'Hidden treats',
    'Climbing challenge'
];

function initializeItems() {
    const weeklyContainer = document.getElementById('weeklyItems');
    const dailyContainer = document.getElementById('dailyItems');

    weeklyContainer.innerHTML = '';
    dailyContainer.innerHTML = '';

    defaultWeeklyItems.forEach(item => {
        addWeeklyItem(item);
    });

    defaultDailyItems.forEach(item => {
        addDailyItem(item);
    });
}

function addWeeklyItem(value = '') {
    const container = document.getElementById('weeklyItems');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-row';
    itemDiv.innerHTML = `
                <input type="text" value="${value}" placeholder="Enter weekly enrichment item" class="weekly-input">
                <button class="btn-remove" onclick="removeItem(this)">Remove</button>
            `;
    container.appendChild(itemDiv);
}

function addDailyItem(value = '') {
    const container = document.getElementById('dailyItems');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-row';
    itemDiv.innerHTML = `
                <input type="text" value="${value}" placeholder="Enter daily enrichment item" class="daily-input">
                <button class="btn-remove" onclick="removeItem(this)">Remove</button>
            `;
    container.appendChild(itemDiv);
}

function removeItem(btn) {
    btn.parentElement.remove();
}

function getWeeklyItems() {
    const inputs = document.querySelectorAll('.weekly-input');
    return Array.from(inputs)
        .map(input => input.value.trim())
        .filter(value => value !== '');
}

function getDailyItems() {
    const inputs = document.querySelectorAll('.daily-input');
    return Array.from(inputs)
        .map(input => input.value.trim())
        .filter(value => value !== '');
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

function generateSchedule() {
    const monthInput = document.getElementById('month').value;
    if (!monthInput) {
        alert('Please select a month and year');
        return;
    }

    const institution = document.getElementById('institution').value.trim();
    const area = document.getElementById('area').value.trim();

    const [year, month] = monthInput.split('-').map(Number);
    const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
    const daysInMonth = getDaysInMonth(year, month - 1);
    const firstDay = getFirstDayOfMonth(year, month - 1);

    const monthlyItems = document.getElementById('monthly').value
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '');

    const weeklyItems = getWeeklyItems();
    const dailyItems = getDailyItems();

    if (weeklyItems.length === 0) {
        alert('Please add at least one weekly enrichment item');
        return;
    }

    if (dailyItems.length === 0) {
        alert('Please add at least one daily enrichment item');
        return;
    }

    const shuffledWeekly = shuffleArray(weeklyItems);
    const shuffledDaily = shuffleArray(dailyItems);

    // Track usage counts for order list
    window.scheduleData = {
        monthlyUsage: {},
        weeklyUsage: {},
        dailyUsage: {}
    };

    // Initialize counts
    monthlyItems.forEach(item => {
        window.scheduleData.monthlyUsage[item] = 1; // Monthly items used once per month
    });
    weeklyItems.forEach(item => {
        window.scheduleData.weeklyUsage[item] = 0;
    });
    dailyItems.forEach(item => {
        window.scheduleData.dailyUsage[item] = 0;
    });

    let output = '';

    // Header with institution and area info
    if (institution || area) {
        output += '<div class="header-info">';
        if (institution) {
            output += `<div class="info-row"><span class="info-label">Zoo Institution:</span> ${institution}</div>`;
        }
        if (area) {
            output += `<div class="info-row"><span class="info-label">Area/Enclosure:</span> ${area}</div>`;
        }
        output += '</div>';
    }

    output += `<h3 style="text-align: center; margin-bottom: 20px; font-size: 1.8em; color: #667eea;">${monthName}</h3>`;

    if (monthlyItems.length > 0) {
        output += `<div class="monthly-events">
                    <strong>Monthly Events:</strong> ${monthlyItems.join(', ')}
                </div>`;
    }

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let currentDay = 1;
    let currentWeek = 0;
    let dailyIndex = 0;

    while (currentDay <= daysInMonth) {
        const weeklyItem = shuffledWeekly[currentWeek % shuffledWeekly.length];
        window.scheduleData.weeklyUsage[weeklyItem] = (window.scheduleData.weeklyUsage[weeklyItem] || 0) + 1;

        output += `<div class="calendar-week">
                    <div class="week-header">Week ${currentWeek + 1}</div>
                    <div class="weekly-focus">Weekly Focus: ${weeklyItem}</div>
                    <div class="calendar-grid">`;

        // Day headers
        dayNames.forEach(day => {
            output += `<div class="calendar-day-header">${day}</div>`;
        });

        // Empty cells before first day of month
        if (currentWeek === 0) {
            for (let i = 0; i < firstDay; i++) {
                output += `<div class="calendar-day empty"></div>`;
            }
        }

        // Fill in the days
        const startDayOfWeek = currentWeek === 0 ? firstDay : 0;
        for (let i = startDayOfWeek; i < 7 && currentDay <= daysInMonth; i++) {
            const dailyItem = shuffledDaily[dailyIndex % shuffledDaily.length];
            window.scheduleData.dailyUsage[dailyItem] = (window.scheduleData.dailyUsage[dailyItem] || 0) + 1;

            const dayOfWeek = dayNames[i];

            output += `<div class="calendar-day" data-day="${dayOfWeek}">
                        <div class="day-number">${currentDay}</div>
                        <div class="day-content">${dailyItem}</div>
                    </div>`;

            dailyIndex++;
            currentDay++;
        }

        // Empty cells after last day of month
        if (currentDay > daysInMonth) {
            const lastDayOfWeek = (firstDay + daysInMonth - 1) % 7;
            for (let i = lastDayOfWeek + 1; i < 7; i++) {
                output += `<div class="calendar-day empty"></div>`;
            }
        }

        output += `</div></div>`;
        currentWeek++;
    }

    document.getElementById('scheduleOutput').innerHTML = output;
    document.getElementById('results').classList.add('show');
    document.getElementById('orderListSection').classList.remove('show');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

function generateOrderList() {
    if (!window.scheduleData) {
        alert('Please generate a schedule first before creating the order list');
        return;
    }

    const monthInput = document.getElementById('month').value;
    const institution = document.getElementById('institution').value.trim();
    const area = document.getElementById('area').value.trim();
    const [year, month] = monthInput.split('-').map(Number);
    const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });

    let output = '<h3>Monthly Item Order List</h3>';

    // Header info
    if (institution || area) {
        output += '<div style="text-align: center; margin-bottom: 20px; padding: 15px; background: #e7f3ff; border-radius: 8px;">';
        if (institution) {
            output += `<div><strong>Zoo Institution:</strong> ${institution}</div>`;
        }
        if (area) {
            output += `<div><strong>Area/Enclosure:</strong> ${area}</div>`;
        }
        output += `<div style="margin-top: 10px; font-size: 1.1em; color: #667eea;"><strong>${monthName}</strong></div>`;
        output += '</div>';
    } else {
        output += `<div style="text-align: center; margin-bottom: 20px; font-size: 1.1em; color: #667eea;"><strong>${monthName}</strong></div>`;
    }

    // Monthly Items
    if (Object.keys(window.scheduleData.monthlyUsage).length > 0) {
        output += '<div class="order-category">';
        output += '<h4>Monthly Enrichment Items</h4>';
        output += '<ul>';
        for (const [item, count] of Object.entries(window.scheduleData.monthlyUsage)) {
            output += `<li><span class="item-name">${item}</span><span class="item-quantity">Qty: ${count}</span></li>`;
        }
        output += '</ul>';
        output += '</div>';
    }

    // Weekly Items
    output += '<div class="order-category">';
    output += '<h4>Weekly Enrichment Items</h4>';
    output += '<ul>';
    for (const [item, count] of Object.entries(window.scheduleData.weeklyUsage)) {
        output += `<li><span class="item-name">${item}</span><span class="item-quantity">Qty: ${count} weeks</span></li>`;
    }
    output += '</ul>';
    output += '</div>';

    // Daily Items
    output += '<div class="order-category">';
    output += '<h4>Daily Enrichment Items</h4>';
    output += '<ul>';
    for (const [item, count] of Object.entries(window.scheduleData.dailyUsage)) {
        output += `<li><span class="item-name">${item}</span><span class="item-quantity">Qty: ${count} days</span></li>`;
    }
    output += '</ul>';
    output += '</div>';

    document.getElementById('orderListSection').innerHTML = output;
    document.getElementById('orderListSection').classList.add('show');
    document.getElementById('orderListSection').scrollIntoView({ behavior: 'smooth' });
}

window.onload = initializeItems;
