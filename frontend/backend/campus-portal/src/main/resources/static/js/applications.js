redirectIfNotLoggedIn();
const user = getUser();
document.getElementById('userName').textContent = user.fullName;

async function loadApplications() {
    const container = document.getElementById('applicationsContainer');
    container.innerHTML = 'Loading...';
    try {
        const headers = getAuthHeaders();
        const res = await fetch(`/api/applications/student/${user.userId}`, { headers });
        if (!res.ok) throw new Error('Failed');
        const apps = await res.json();
        if (apps.length === 0) {
            container.innerHTML = '<p>No applications yet.</p>';
            return;
        }
        container.innerHTML = apps.map(a => `
            <div class="card">
                <h3>${a.trainingTitle}</h3>
                <p>Status: <span class="badge badge-${a.status.toLowerCase()}">${a.status}</span></p>
                <p><small>Applied: ${new Date(a.appliedAt).toLocaleDateString()}</small></p>
                ${a.feedback ? `<p><strong>Feedback:</strong> ${a.feedback}</p>` : ''}
            </div>
        `).join('');
    } catch (e) { container.innerHTML = '<p>Error loading applications</p>'; }
}
loadApplications();