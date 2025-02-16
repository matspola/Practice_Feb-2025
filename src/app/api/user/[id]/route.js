export async function GET(
    request, 
    {params}
) {
    const { id } = params;
    try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        
        if (!response.ok) {
            return new Response(JSON.stringify({ error: 'Ошибка HTTP' }), { status: response.status });
        }
        
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    
}