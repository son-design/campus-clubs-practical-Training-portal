// ===== TRAININGS PAGE =====

redirectIfNotLoggedIn();

const user = getUser();
if (user) {
    document.getElementById('userName').textContent = user.fullName || user.username;
}

async function loadTrainings() {
    const container = document.getElementById('trainingsContainer');
    container.innerHTML = '<p>Loading trainings...</p>';

    try {
        const headers = getAuthHeaders();
        const res = await fetch('/api/pt-trainings', { headers });

        if (!res.ok) {
            container.innerHTML = '<p style="color:red;">Failed to load trainings</p>';
            return;
        }

        const trainings = await res.json();

        if (trainings.length === 0) {
            container.innerHTML = '<p style="color:#999;">No trainings available</p>';
            return;
        }

        let appliedIds = [];
        if (user && user.role === 'STUDENT' && user.userId) {
            const myRes = await fetch(`/api/applications/student/${user.userId}`, { headers });
            if (myRes.ok) {
                const apps = await myRes.json();
                appliedIds = apps.map(a => a.id);
            }
        }

        container.innerHTML = trainings.map(t => `
            <div class="card">
                <h3>${t.title}</h3>
                <p>${t.description || 'No description'}</p>
                <p style="font-size:13px; color:#6b7280;">
                    Location: ${t.location || 'TBD'} | Slots: ${t.availableSlots || 'Unlimited'}
                </p>
                <p style="font-size:13px; color:#6b7280;">
                    Deadline: ${t.applicationDeadline ? new Date(t.applicationDeadline).toLocaleDateString() : 'Not set'}
                </p>
                <div style="margin-top:8px;">
                    <span class="badge ${t.status === 'OPEN' ? 'badge-open' : 'badge-closed'}">${t.status}</span>
                    ${t.mentorName ? `<span style="margin-left:10px; font-size:13px;">Mentor: ${t.mentorName}</span>` : ''}
                </div>
                ${user && user.role === 'STUDENT' && t.status === 'OPEN' ? `
                    <div class="card-actions">
                        ${appliedIds.includes(t.id) 
                            ? `<span style="color:#16a34a; font-weight:600;">✅ Applied</span>`
                            : `<button onclick="applyTraining(${t.id})" class="btn btn-success" style="padding:6px 16px;">Apply</button>`
                        }
                    </div>
                ` : ''}
            </div>
        `).join('');
    } catch (err) {
        container.innerHTML = '<p style="color:red;">Error loading trainings</p>';
        console.error(err);
    }
}

async function applyTraining(trainingId) {
    if (!user || !user.userId) {
        alert('Please login first');
        return;
    }

    try {
        const res = await fetch(`/api/applications?studentId=${user.userId}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ trainingId, notes: '' })
        });

        if (res.ok) {
            alert('✅ Successfully applied for training!');
            loadTrainings();
        } else {
            const data = await res.json();
            alert('❌ ' + (data.message || 'Failed to apply'));
        }
    } catch (err) {
        alert('❌ Error applying for training');
        console.error(err);
    }
}

loadTrainings();