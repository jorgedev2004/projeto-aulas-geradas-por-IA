CREATE TABLE planos_gerados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    -- A coluna que liga o plano ao seu criador
    user_id UUID,
    ano_escolar TEXT,
    materia TEXT,
    tema_aula TEXT,
    duracao_minutos INT,
    contexto_adicional TEXT,
    introducao_ludica TEXT,
    objetivo_bncc TEXT,
    passo_a_passo TEXT,
    rubrica_avaliacao TEXT
);

-- funcionalidade de RLS na tabela
ALTER TABLE planos_gerados ENABLE ROW LEVEL SECURITY;

--criar as regras (políticas):

-- REGRA 1: Qualquer pessoa pode criar um plano de aula.
-- qualquer um é um "visitante anônimo"
CREATE POLICY "Qualquer pessoa pode criar planos"
ON planos_gerados FOR INSERT
WITH CHECK (true);

-- REGRA 2: Qualquer pessoa pode ler qualquer plano de aula.
-- (Como o app não tem login, não há como separar os planos por dono)
CREATE POLICY "Qualquer pessoa pode ler os planos"
ON planos_gerados FOR SELECT
USING (true);