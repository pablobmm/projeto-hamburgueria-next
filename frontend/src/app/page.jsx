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
      <section className="hero bg-zinc-900">
        <div className="container mx-auto px-4 py-20 flex items-center">
          <div className="leftside w-1/2">
            <h1 className="text-5xl font-bold mb-4">O Hamburguer mais delicioso!</h1>
            <p className="text-lg text-gray-300 mb-8">A primeira hamburgueria virtual que você faz o pedido online e come o burger através do computador.</p>
            <a href="#" className="bg-amber-500 text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-600">
              Fazer pedido
            </a>
          </div>
          <div className="rightside w-1/2 flex justify-center">
            <Image src="/assets/heroBurger.png"
              alt="Burger delicioso"
              width={500}
              height={500}
              className='animate-float' />
          </div>
        </div>
      </section>
      <section className="search container mx-auto px-4 py-16">
        <div className="title text-3xl font-bold mb-6">
          Pesquise o seu<br />Hamburguer favorito!
        </div>
        <div className="sides flex flex-col md:flex-row gap-4">
          <div className="leftside flex-grow">
            <input
              type="text"
              placeholder="Digite o nome do Burger"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-white placeholder-gray-500"
            />
          </div>
          <div className="rightside">
            <select className="w-full md:w-auto bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-white">
              <option value="">Selecionar categoria</option>
              <option value="burgers">Burgers</option>
            </select>
          </div>
        </div>
      </section>
      <main className="container mx-auto px-4 py-4">
        <div id="lista-lanches" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lanches.length > 0 ? (
            lanches.map(lanche => (
              <BurgerCard key={lanche.id} lanche={lanche} />
            ))
          ) : (
            <p className="text-gray-400 col-span-3">Desculpe, não foi possível carregar o cardápio.</p>
          )}
        </div>
      </main>
    </>
  )
}