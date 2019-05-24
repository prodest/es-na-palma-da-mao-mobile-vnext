import { AlunosApiService } from './alunos.api.service';
import { AlunoService } from './alunos.service';
import { AlunosQuery } from './alunos.query';
import { AlunosStore } from './alunos.store';

export { AlunosApiService, AlunoService, AlunosQuery, AlunosStore };

export const AlunosProviders = [AlunosApiService, AlunoService, AlunosQuery, AlunosStore];
