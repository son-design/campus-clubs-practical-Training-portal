// ===== CLUBS PAGE =====

redirectIfNotLoggedIn();

const user = getUser();
if (user) {
    document.getElementById('userName').textContent = user.fullName || user.username;
}

async function loadClubs() {
    const container = document.getElementById('clubsContainer');
    container.innerHTML = '<p>Loading clubs...</p>';

    try {
        const headers = getAuthHeaders();
        const res = await fetch('/api/clubs', { headers });

        if (!res.ok) {
            container.innerHTML = '<p style="color:red;">Failed to load clubs</p>';
            return;
        }

        const clubs = await res.json();

        if (clubs.length === 0) {
            container.innerHTML = '<p style="color:#999;">No clubs available</p>';
            return;
        }

        let myClubIds = [];
        if (user && user.role === 'STUDENT' && user.userId) {
            const myRes = await fetch(`/api/clubs/student/${user.userId}`, { headers });
            if (myRes.ok) {
                const myClubs = await myRes.json();
                myClubIds = myClubs.map(c => c.id);
            }
        }

        container.innerHTML = clubs.map(club => `
            <div class="card">
                <h3>${club.name}</h3>
                <p>${club.description || 'No description'}</p>
                <p style="font-size:13px; color:#6b7280;">
                    Category: ${club.category || 'General'} | Members: ${club.memberCount || 0}
                </p>
                ${user && user.role === 'STUDENT' ? `
                    <div class="card-actions">
                        ${myClubIds.includes(club.id) 
                            ? `<button onclick="leaveClub(${club.id})" class="btn btn-danger" style="padding:6px 16px;">Leave</button>`
                            : `<button onclick="joinClub(${club.id})" class="btn btn-success" style="padding:6px 16px;">Join</button>`
                        }
                    </div>
                ` : ''}
            </div>
        `).join('');
    } catch (err) {
        container.innerHTML = '<p style="color:red;">Error loading clubs</p>';
        console.error(err);
    }
}

async function joinClub(clubId) {
    if (!user || !user.userId) {
        alert('Please login first');
        return;
    }

    try {
        const res = await fetch(`/api/clubs/${clubId}/join?studentId=${user.userId}`, {
            method: 'POST',
            headers: getAuthHeaders()
        });

        if (res.ok) {
            alert('✅ Successfully joined the club!');
            loadClubs();
        } else {
            const data = await res.json();
            alert('❌ ' + (data.message || 'Failed to join'));
        }
    } catch (err) {
        alert('❌ Error joining club');
        console.error(err);
    }
}

async function leaveClub(clubId) {
    if (!confirm('Are you sure you want to leave this club?')) return;

    try {
        const res = await fetch(`/api/clubs/${clubId}/leave?studentId=${user.userId}`, {
            method: 'POST',
            headers: getAuthHeaders()
        });

        if (res.ok) {
            alert('✅ Successfully left the club');
            loadClubs();
        } else {
            const data = await res.json();
            alert('❌ ' + (data.message || 'Failed to leave'));
        }
    } catch (err) {
        alert('❌ Error leaving club');
        console.error(err);
    }
}

loadClubs();