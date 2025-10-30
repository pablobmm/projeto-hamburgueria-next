import Image from 'next/image'
import BurgerCard from '@/components/BurgerCard';

async function getLanches() {
  const urlAPI = 'http://localhost:5002/lanche';
  try {
    const response = await fetch(urlAPI, {
      cache: 'no-store' 
    });

    if (!response.ok) {
      throw new Error(`Erro na rede: ${response.statusText}`);
    }
    return response.json();

  } catch (error) {
    console.error('Ocorreu um erro ao buscar os lanches:', error);
    return [];
  }
}

export default async function Home() {
  
  const lanches = await getLanches();

  return (
    <>
      <section className="container mx-auto px-4 py-16 flex items-center">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold mb-4">O Hamburguer mais delicioso!</h1>
          <p className="text-lg text-gray-300 mb-8">A primeira hamburgueria virtual que você faz o pedido online e come o burger através do computador.</p>
          <a href="#" className="bg-amber-500 text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-600">
            Fazer pedido
          </a>
        </div>
        <div className="w-1/2">
          <Image src="/assets/burgers/burger-hero.png" alt="Hamburguer" width={500} height={500} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Pesquise o seu Burger favorito!</h2>
        
        <div id="lista-lanches" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {lanches.length > 0 ? (
            lanches.map(lanche => (
              <BurgerCard key={lanche.id} lanche={lanche} />
            ))
          ) : (
            <p>Desculpe, não foi possível carregar o cardápio.</p>
          )}

        </div>
      </section>
    </>
  )
}