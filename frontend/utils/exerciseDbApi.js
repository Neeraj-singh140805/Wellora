import axios from 'axios';

const EXERCISE_DB_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

// Cache the data to avoid repeated large fetches
let cachedExercises = null;

const getExercises = async () => {
    if (cachedExercises) return cachedExercises;
    try {
        const response = await axios.get(EXERCISE_DB_URL);
        // Map data to match our app's structure
        cachedExercises = response.data.map(ex => ({
            id: ex.id,
            name: ex.name,
            title: ex.name, // Fallback for existing components
            category: ex.category,
            bodyPart: ex.primaryMuscles[0] || 'Full Body',
            target: ex.primaryMuscles.join(', '),
            gifUrl: ex.images && ex.images.length > 0 ? `${IMAGE_BASE_URL}${ex.images[0]}` : null,
            instructions: ex.instructions
        }));
        return cachedExercises;
    } catch (error) {
        console.error("Error fetching exercise database:", error);
        return [];
    }
};

export const exerciseDbApi = {
    // Fetch all exercises (simulated pagination)
    getAllExercises: async (limit = 50) => {
        const all = await getExercises();
        return all.slice(0, limit);
    },

    // Search exercises by name (client-side filtering)
    searchExercises: async (name) => {
        const all = await getExercises();
        if (!name) return all.slice(0, 50);

        const lowerName = name.toLowerCase();
        return all.filter(ex =>
            ex.name.toLowerCase().includes(lowerName) ||
            ex.category.toLowerCase().includes(lowerName) ||
            ex.target.toLowerCase().includes(lowerName)
        ).slice(0, 50); // Limit results
    }
};
