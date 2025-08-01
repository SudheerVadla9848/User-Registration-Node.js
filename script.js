async function fetchUsers() {
      const res = await fetch('http://localhost:5000/users');
      const users = await res.json();
      const tbody = document.querySelector('#usersTable tbody');
      tbody.innerHTML = ''; 

      users.forEach(user => {
        const row = document.createElement('tr');
        row.dataset.id = user._id;

        row.innerHTML = `
          <td><span class="user-name">${user.name}</span></td>
          <td><span class="user-email">${user.email}</span></td>
          <td>
            <span class="action-btn edit-btn">Edit</span>
            <span class="action-btn delete-btn">Delete</span>
          </td>
        `;

        
        row.querySelector('.edit-btn').addEventListener('click', () => enterEditMode(row, user));
       
        row.querySelector('.delete-btn').addEventListener('click', () => deleteUser(user._id));

        tbody.appendChild(row);
      });
    }

    function enterEditMode(row, user) {
      row.innerHTML = `
        <td><input class="edit-input" type="text" value="${user.name}" /></td>
        <td><input class="edit-input" type="email" value="${user.email}" /></td>
        <td>
          <span class="action-btn save-btn">Save</span>
          <span class="action-btn cancel-btn">Cancel</span>
        </td>
      `;

      row.querySelector('.save-btn').addEventListener('click', async () => {
        const updatedName = row.querySelector('input[type="text"]').value;
        const updatedEmail = row.querySelector('input[type="email"]').value;
        await updateUser(user._id, updatedName, updatedEmail);
      });

      row.querySelector('.cancel-btn').addEventListener('click', () => fetchUsers());
    }

    async function updateUser(id, name, email) {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      fetchUsers(); 
    }

    async function deleteUser(id) {
        if (!confirm('Are you sure you want to delete this user?')) {
          return;  
        }
        await fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' });
        fetchUsers();  
      }
      

    document.getElementById('registrationForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (password.length < 8) {
        alert('Password must be at least 8 characters.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword })
      });

      const data = await res.text();
      alert(data); 
      e.target.reset(); 
      fetchUsers(); 
    });

    window.onload = fetchUsers; 