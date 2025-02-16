export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const limit = searchParams.get('limit') || 10;
    const skip = searchParams.get('skip') || 0;
  
    try {
        const response = await fetch(`https://dummyjson.com/users?search=${search}&limit=${limit}&skip=${skip}`);
        
        if (!response.ok) {
            return new Response(JSON.stringify({ 
                error: 'Ошибка HTTP' }), 
                { status: response.status }
            );
        }
        
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error('Ошибка при обращении к DummyJSON:', error);
        return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера' }), { status: 500 });
    }
}
