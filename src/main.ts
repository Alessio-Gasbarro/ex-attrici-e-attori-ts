//Snack 1

type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string,
}

//Snack 2

type ActressNationality = "American" | "British" | "Australian" | "South African" | "French" | "Indian" | "Spanish" | "South Korean" | "Chinese"

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: ActressNationality,
}

//Snack 3

function isActress(dati: unknown): dati is Actress {
  return (
    typeof dati === 'object' && dati !== null &&
    "id" in dati && typeof dati.id === 'number' && //id property
    "name" in dati && typeof dati.name === 'string' &&
    "birth_year" in dati && typeof dati.birth_year === 'number' &&
    "death_year" in dati && typeof dati.death_year === 'number' &&
    "biography" in dati && typeof dati.biography === 'string' &&
    "image" in dati && typeof dati.image === 'string' &&
    "most_famous_movies" in dati &&
    dati.most_famous_movies instanceof Array &&
    dati.most_famous_movies.length === 3 &&
    dati.most_famous_movies.every(m => typeof m === 'string') &&
    "awards" in dati && typeof dati.awards === 'string' &&
    "nationality" in dati && typeof dati.nationality === 'string'
  )
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`https://freetestapi.com/api/v1/actresses/&{id}`);
    const dati: unknown = await response.json();
    if (!isActress(dati)) {
      throw new Error('Formato dei dati non valido');
    }
    return dati;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Errore durante il recupero della attrice', error);
    } else {
      console.error('Errore sconosciuto:', error);
    }
    return null;
  }
}