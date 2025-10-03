import { useState, useEffect } from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3000/employees");
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>社員管理システム</h1>
      </header>
      <main>
        <h2>従業員一覧</h2>
        <div className="employee-list">
          {employees.map((employee) => (
            <div key={employee.id} className="employee-card">
              <h3>{employee.name}</h3>
              <p>{employee.email}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
