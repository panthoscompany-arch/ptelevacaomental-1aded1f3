/*
  === INSTRUÇÕES DE CONFIGURAÇÃO GLOBAL ===

  1) Google Tag Manager (substitua no <head> do index.html):

     <!-- Google Tag Manager -->
     <script>
       (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
       var f=d.getElementsByTagName(s)[0],
         j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
       j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
       f.parentNode.insertBefore(j,f);
       })(window,document,'script','dataLayer','GTM-K68SKCXG');
     </script>
     <!-- End Google Tag Manager -->

  2) Google Tag Manager (logo após a tag <body> de index.html):

     <!-- Google Tag Manager (noscript) -->
     <noscript>
       <iframe
         src="https://www.googletagmanager.com/ns.html?id=GTM-K68SKCXG"
         height="0"
         width="0"
         style="display:none;visibility:hidden"
       ></iframe>
     </noscript>
     <!-- End Google Tag Manager (noscript) -->

  3) VTurb Performance (adicionar no <head> de index.html):

     <script>
       !function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);
     </script>
     <link
       rel="preload"
       href="https://scripts.converteai.net/930d9485-c45e-4f04-a322-39acad49f75c/players/69611603d57dbf78326af255/v4/player.js"
       as="script"
     />
     <link
       rel="preload"
       href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js"
       as="script"
     />
     <link
       rel="preload"
       href="https://cdn.converteai.net/930d9485-c45e-4f04-a322-39acad49f75c/696115398990e4119b4e389e/main.m3u8"
       as="fetch"
     />
     <link rel="dns-prefetch" href="https://cdn.converteai.net" />
     <link rel="dns-prefetch" href="https://scripts.converteai.net" />
     <link rel="dns-prefetch" href="https://images.converteai.net" />
     <link rel="dns-prefetch" href="https://api.vturb.com.br" />

  As seções abaixo implementam a landing page em React.
*/

import { useEffect, useMemo, useState } from "react";
import { ShieldCheck, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import VTurbPlayer from "@/components/VTurbPlayer";

const VIEWERS_MIN = 480;
const VIEWERS_MAX = 520;

const SOCIAL_PROOF_MESSAGES = [
  "João Antunes de Belém adquiriu o protocolo Elevação Mental",
  "Mariana Costa de São Paulo acabou de entrar",
  "Carlos Eduardo de Curitiba garantiu sua vaga",
  "Fernanda Lima de Salvador comprou agora",
  "Pedro Henrique de Porto Alegre adquiriu o protocolo",
];

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Index = () => {
  const [viewers, setViewers] = useState(() => getRandomInt(VIEWERS_MIN, VIEWERS_MAX));
  const [showOffer, setShowOffer] = useState(false);
  const [toastIndex, setToastIndex] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);

  const debugMode = useMemo(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    return params.get("debug") === "true";
  }, []);

  // Contador de pessoas assistindo agora (simulado)
  useEffect(() => {
    let timeoutId: number;

    const scheduleNext = () => {
      const delay = getRandomInt(3000, 7000);
      timeoutId = window.setTimeout(() => {
        setViewers((current) => {
          const delta = getRandomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
          const next = current + delta;
          return Math.max(VIEWERS_MIN - 50, Math.min(VIEWERS_MAX + 50, next));
        });
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  // Lógica da oferta atrasada
  useEffect(() => {
    if (debugMode) {
      setShowOffer(true);
      return;
    }

    const DELAY_MS = 579000; // 9 minutos e 39 segundos
    const timerId = window.setTimeout(() => {
      setShowOffer(true);
    }, DELAY_MS);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [debugMode]);

  // Social proof toasts
  useEffect(() => {
    let showTimeoutId: number;
    let hideTimeoutId: number;

    const scheduleToast = () => {
      const delay = getRandomInt(15000, 45000);
      showTimeoutId = window.setTimeout(() => {
        setToastVisible(true);
        hideTimeoutId = window.setTimeout(() => {
          setToastVisible(false);
          setToastIndex((prev) => (prev + 1) % SOCIAL_PROOF_MESSAGES.length);
          scheduleToast();
        }, 4000);
      }, delay);
    };

    scheduleToast();

    return () => {
      window.clearTimeout(showTimeoutId);
      window.clearTimeout(hideTimeoutId);
    };
  }, []);

  const handleCtaClick = () => {
    // Disparo de evento para Google Tag Manager
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "cta_click",
      cta_label: "QUERO ACESSO IMEDIATO",
      page: "protocolo_elevacao_mental",
    });

    // TODO: Substituir pela URL final de checkout
    // window.location.href = "https://seu-checkout.com";
  };

  const currentToastMessage = SOCIAL_PROOF_MESSAGES[toastIndex];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-4 py-8 md:px-6 lg:px-8">
        {/* Hero / VSL */}
        <section className="flex flex-1 flex-col items-center gap-6 text-center">
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Protocolo Elevação Mental
            </p>
            <h1 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
              Eleve sua mente, blinde seu foco e alcance produtividade máxima.
            </h1>
            <p className="text-balance text-sm text-muted-foreground md:text-base">
              Assista ao vídeo abaixo e descubra o método simples para destravar sua mente, eliminar a
              procrastinação e agir com clareza todos os dias.
            </p>
          </header>

          <div className="w-full max-w-xl space-y-3">
            <VTurbPlayer />

            {/* Contador de espectadores */}
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground shadow-sm">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/60 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
              </span>
              <span>
                <span className="font-semibold text-foreground">{viewers}</span> pessoas assistindo agora
              </span>
            </div>
          </div>

          {/* Oferta atrasada */}
          {showOffer ? (
            <section className="mt-4 w-full max-w-xl space-y-4 rounded-xl border bg-card p-4 text-center shadow-sm">
              <h2 className="text-lg font-semibold tracking-tight md:text-xl">
                Sua Mente Blindada e Produtividade Máxima.
              </h2>
              <p className="text-sm text-muted-foreground">
                Acesse agora o Protocolo Elevação Mental e comece hoje mesmo a reprogramar sua mente para
                disciplina, foco e resultados consistentes.
              </p>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full animate-pulse text-base font-semibold md:text-lg"
                  onClick={handleCtaClick}
                >
                  QUERO ACESSO IMEDIATO
                </Button>

                <div className="flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground md:flex-row md:text-[0.7rem]">
                  <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Compra 100% segura</span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1">
                    <BadgeCheck className="h-4 w-4" />
                    <span>Garantia incondicional de 7 dias</span>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <p className="mt-4 max-w-md text-center text-xs text-muted-foreground">
              A oferta especial será liberada automaticamente após alguns minutos de vídeo. Permaneça até o fim
              para garantir as melhores condições.
            </p>
          )}
        </section>

        {/* Social proof toast */}
        <div
          className={`pointer-events-none fixed left-1/2 top-4 z-40 w-[90%] max-w-xs -translate-x-1/2 transform transition-all duration-300 md:left-4 md:top-auto md:bottom-4 md:max-w-sm md:translate-x-0 ${
            toastVisible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-4 md:-translate-x-full"
          }`}
        >
          <div className="pointer-events-auto flex items-center gap-3 rounded-lg bg-primary px-4 py-3 text-xs text-primary-foreground shadow-lg">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/10">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-background/60 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-background" />
              </span>
            </div>
            <p className="text-left font-medium leading-snug">{currentToastMessage}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
