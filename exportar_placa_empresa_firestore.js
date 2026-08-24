const fs = require("node:fs");

const config = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyCoovV6Vds98iJbxnowkpaUXZaNF3MUM-0",
  projectId: process.env.FIREBASE_PROJECT_ID || "controle-de-frotas-fbef5",
};

const collectionPath = process.argv[2];
const outputFile = process.argv[3] || "placas_empresas.json";

if (!collectionPath) {
  console.error("Uso: node exportar_placa_empresa_firestore.js <colecao-ou/caminho> [saida.json]");
  process.exit(1);
}

function firestoreValueToJs(value) {
  if (!value || typeof value !== "object") return undefined;

  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("timestampValue" in value) return value.timestampValue;
  if ("nullValue" in value) return null;
  if ("arrayValue" in value) {
    return (value.arrayValue.values || []).map(firestoreValueToJs);
  }
  if ("mapValue" in value) {
    return Object.fromEntries(
      Object.entries(value.mapValue.fields || {}).map(([key, child]) => [
        key,
        firestoreValueToJs(child),
      ])
    );
  }

  return undefined;
}

function documentToObject(document) {
  const fields = document.fields || {};
  const item = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, firestoreValueToJs(value)])
  );

  return {
    placa: item.placa || "",
    empresa: item.empresa || "",
  };
}

async function fetchAllDocuments() {
  const documents = [];
  let pageToken = "";

  do {
    const url = new URL(
      `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents/${collectionPath}`
    );
    url.searchParams.set("key", config.apiKey);
    url.searchParams.set("pageSize", "300");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const response = await fetch(url);
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(
        `${response.status} ${response.statusText}: ${payload.error?.message || "erro ao consultar Firestore"}`
      );
    }

    documents.push(...(payload.documents || []));
    pageToken = payload.nextPageToken || "";
  } while (pageToken);

  return documents;
}

async function main() {
  const documents = await fetchAllDocuments();
  const resultado = documents
    .map(documentToObject)
    .filter((item) => item.placa || item.empresa);

  fs.writeFileSync(outputFile, JSON.stringify(resultado, null, 2), "utf8");

  console.log(`JSON gerado: ${outputFile}`);
  console.log(`Documentos lidos: ${documents.length}`);
  console.log(`Itens com placa/empresa: ${resultado.length}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
