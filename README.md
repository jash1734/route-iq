# VertexFlow

VertexFlow is an interactive route optimization and pathfinding visualizer built using Next.js, React Flow, TypeScript, Tailwind CSS, and Zustand.

The application allows users to create custom graph networks, connect locations with weighted routes, simulate traffic conditions, and visualize shortest path algorithms like Dijkstra and A* in real time.

---

## 🚀 Features

- Interactive graph-based route creation
- Drag and reposition nodes dynamically
- Connect locations with weighted roads
- Traffic-aware route optimization
- Dijkstra shortest path algorithm
- A* pathfinding algorithm
- Real-time traversal visualization
- Animated shortest path highlighting
- Algorithm comparison system
- Route analytics dashboard
- Graph export functionality
- Responsive modern dashboard UI
- Dark futuristic interface

---

## 🧠 Algorithms Used

### Dijkstra Algorithm
Used for guaranteed shortest path computation in weighted graphs.

**Time Complexity**

```txt
O((V + E) log V)
```

---

### A* Algorithm
Uses heuristic-guided search for optimized pathfinding.

**Average Time Complexity**

```txt
O(E)
```

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### State Management
- Zustand

### Graph Visualization
- React Flow

### Algorithms
- Dijkstra Algorithm
- A* Pathfinding

---

## 📸 Core Functionalities

### Dynamic Location Creation
Users can add unlimited locations to the graph.

### Smart Route Connections
Routes can be connected between locations with:
- distance
- traffic level
- weighted cost

### Traffic Simulation
Traffic affects effective route weight:
- Low Traffic → +0
- Medium Traffic → +20
- High Traffic → +50

### Route Analytics
Displays:
- selected algorithm
- shortest distance
- visited nodes
- optimal route

### Graph Export
Export complete graph structure as JSON.

---

## 🎯 Project Goals

VertexFlow was built to:
- visualize graph traversal algorithms
- demonstrate shortest path optimization
- simulate real-world routing systems
- strengthen DSA and frontend engineering skills

---

## 📂 Folder Structure

```bash
app/
components/
algorithms/
store/
types/
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone <your-repo-link>
```

Move into project folder:

```bash
cd vertexflow
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## 🌐 Deployment

The project is deployed using Vercel.

---

## 📈 Future Improvements

- Import graph JSON
- Route replay system
- Real map integration
- Local storage persistence
- Advanced graph analytics
- Mobile drawer sidebar
- Multiple heuristic systems
- Performance benchmarking

---

## 👨‍💻 Author

Developed by Jash Deshani

---

## ⭐ If you like this project

Give it a star on GitHub.