<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Peserta - LKS Cloud // CYBER_GRID</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        cyber: ['Orbitron', 'sans-serif'],
                        tech: ['Rajdhani', 'sans-serif'],
                    },
                    colors: {
                        'neon-blue': '#00f3ff',
                        'neon-pink': '#ff003c',
                        'neon-yellow': '#fcee0a',
                        'cyber-bg': '#050505',
                        'cyber-panel': '#0a0a0f',
                    },
                    animation: {
                        'glitch-anim': 'glitch 1s linear infinite',
                        'pulse-neon': 'pulse-neon 2s infinite',
                        'scanline': 'scanline 8s linear infinite',
                    },
                    keyframes: {
                        glitch: {
                            '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
                            '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
                            '62%': { transform: 'translate(0,0) skew(5deg)' },
                        },
                        'pulse-neon': {
                            '0%, 100%': { opacity: '1' },
                            '50%': { opacity: '0.5' },
                        },
                        scanline: {
                            '0%': { transform: 'translateY(-100%)' },
                            '100%': { transform: 'translateY(100vh)' }
                        }
                    }
                }
            }
        }
    </script>
    <style>
        body { 
            background-color: #050505;
            color: #fff;
            overflow-x: hidden;
            background-image: 
                linear-gradient(rgba(255, 0, 60, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 0, 60, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
        }

        /* Cyberpunk clipped corner panels */
        .cyber-panel {
            background: rgba(10, 10, 15, 0.85);
            backdrop-filter: blur(10px);
            clip-path: polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px));
            border-left: 2px solid #ff003c;
            border-bottom: 2px solid #00f3ff;
            position: relative;
        }

        .cyber-panel::before {
            content: '';
            position: absolute;
            top: 0; right: 0;
            width: 30px; height: 2px;
            background: #ff003c;
        }

        .cyber-panel::after {
            content: '';
            position: absolute;
            bottom: 0; left: 0;
            width: 30px; height: 2px;
            background: #00f3ff;
        }

        .cyber-input {
            background: rgba(255, 0, 60, 0.03);
            border: 1px solid rgba(255, 0, 60, 0.2);
            color: #ff003c;
            clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
            transition: all 0.3s ease;
        }

        .cyber-input:focus {
            outline: none;
            background: rgba(255, 0, 60, 0.1);
            border-color: #ff003c;
            box-shadow: 0 0 10px rgba(255, 0, 60, 0.3);
        }

        .cyber-input::placeholder {
            color: rgba(255, 0, 60, 0.3);
        }

        .cyber-btn {
            background: #ff003c;
            color: #fff;
            clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
            text-transform: uppercase;
            letter-spacing: 2px;
            transition: all 0.2s;
            position: relative;
        }

        .cyber-btn:hover {
            background: #fcee0a;
            color: #050505;
            box-shadow: 0 0 15px #fcee0a;
            transform: scale(1.02);
        }

        .glitch-text {
            position: relative;
        }

        .glitch-text::before, .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            pointer-events: none;
        }

        .glitch-text::before {
            left: 2px;
            text-shadow: -1px 0 #00f3ff;
            clip: rect(24px, 550px, 90px, 0);
            animation: glitch-anim 2s infinite linear alternate-reverse;
        }

        .glitch-text::after {
            left: -2px;
            text-shadow: -1px 0 #ff003c;
            clip: rect(85px, 550px, 140px, 0);
            animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }

        /* Scanline effect */
        .scanline {
            width: 100%;
            height: 10px;
            background: rgba(255, 0, 60, 0.05);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 50;
            pointer-events: none;
            opacity: 0.6;
        }

        /* Decorative dots */
        .dec-dot {
            width: 4px; height: 4px;
            background: #ff003c;
            box-shadow: 0 0 5px #ff003c;
            display: inline-block;
            margin-right: 4px;
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #050505; 
            border-left: 1px solid rgba(255, 0, 60, 0.1);
        }
        ::-webkit-scrollbar-thumb {
            background: #ff003c; 
        }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4 md:p-8 font-tech relative">

    <!-- Global Scanline -->
    <div class="scanline animate-scanline"></div>

    <!-- Background Accents -->
    <div class="absolute top-10 left-10 text-neon-pink opacity-50 font-cyber text-xs tracking-widest hidden md:block">
        SYS.REQ // MOD_USER_PROTO <br>
        SEC.LVL // OMEGA <br>
        <span class="animate-pulse-neon">OVERRIDE_ACTIVE</span>
    </div>
    
    <div class="absolute bottom-10 right-10 text-neon-blue opacity-50 font-cyber text-xs tracking-widest text-right hidden md:block">
        NODE // DB_CIANJUR <br>
        TARGET // ID_<%= user.id %> <br>
    </div>

    <!-- Main Container -->
    <div class="w-full max-w-2xl relative z-10 mt-4 md:mt-0">
        
        <!-- Cyberpunk Panel -->
        <div class="cyber-panel p-8 sm:p-10 shadow-[0_0_30px_rgba(255,0,60,0.1)]">
            
            <!-- Tech Details Header -->
            <div class="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <div class="flex items-center">
                    <span class="dec-dot"></span>
                    <span class="dec-dot"></span>
                    <span class="text-[10px] text-neon-pink tracking-widest font-cyber ml-2">LKS_CLOUD // MOD_ENTITY_<%= user.id %></span>
                </div>
                <div class="text-[10px] text-neon-blue tracking-widest font-cyber">
                    OP_CODE: 0xFF
                </div>
            </div>

            <!-- Title -->
            <div class="mb-10 text-center md:text-left">
                <h1 class="text-3xl md:text-4xl font-black font-cyber text-white uppercase tracking-wider mb-2 glitch-text" data-text="MODIFICATION">
                    MODIFICATION
                </h1>
                <p class="text-neon-pink font-semibold text-sm md:text-base tracking-[0.2em] font-cyber">
                    // PERBARUI_DATA_PESERTA
                </p>
            </div>

            <form action="/edit/<%= user.id %>" method="POST" class="space-y-6 relative z-10">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Field Nama -->
                    <div class="space-y-2">
                        <label class="block text-[11px] font-cyber text-neon-pink uppercase tracking-widest flex justify-between">
                            <span>> NAMA_LENGKAP</span>
                            <span class="text-gray-600">[MOD]</span>
                        </label>
                        <input type="text" name="name" value="<%= user.name %>" required placeholder="NAMA PESERTA"
                            class="cyber-input w-full px-4 py-4 text-base font-tech font-bold block">
                    </div>

                    <!-- Field Email -->
                    <div class="space-y-2">
                        <label class="block text-[11px] font-cyber text-neon-pink uppercase tracking-widest flex justify-between">
                            <span>> ALAMAT_EMAIL</span>
                            <span class="text-gray-600">[MOD]</span>
                        </label>
                        <input type="email" name="email" value="<%= user.email %>" required placeholder="NAMA@SEKOLAH.SCH.ID"
                            class="cyber-input w-full px-4 py-4 text-base font-tech font-bold block uppercase">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Field Asal Sekolah -->
                    <div class="space-y-2">
                        <label class="block text-[11px] font-cyber text-neon-blue uppercase tracking-widest flex justify-between">
                            <span>> ASAL_SEKOLAH</span>
                            <span class="text-gray-600">[MOD]</span>
                        </label>
                        <input type="text" name="school_name" value="<%= user.school_name %>" required placeholder="SMKN 1 CIANJUR"
                            class="cyber-input w-full px-4 py-4 text-base font-tech font-bold block uppercase" style="color: #00f3ff; border-color: rgba(0, 243, 255, 0.2);">
                    </div>

                    <!-- Field No WhatsApp -->
                    <div class="space-y-2">
                        <label class="block text-[11px] font-cyber text-neon-blue uppercase tracking-widest flex justify-between">
                            <span>> KONTAK_WHATSAPP</span>
                            <span class="text-gray-600">[MOD]</span>
                        </label>
                        <input type="tel" name="phone_number" value="<%= user.phone_number %>" required placeholder="08123456789"
                            class="cyber-input w-full px-4 py-4 text-base font-tech font-bold block" style="color: #00f3ff; border-color: rgba(0, 243, 255, 0.2);">
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="pt-8 flex flex-col-reverse md:flex-row items-center gap-4">
                    <a href="/" class="w-full md:w-auto px-6 py-4 border border-white/20 text-gray-400 hover:text-white hover:border-white hover:bg-white/5 transition-all font-cyber text-sm font-bold tracking-widest text-center">
                        < ABORT_OVERRIDE
                    </a>
                    <button type="submit" 
                        class="cyber-btn w-full font-cyber font-bold py-4 text-base flex items-center justify-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        UPDATE_DATA
                    </button>
                </div>
            </form>
        </div>
        
        <!-- Bottom Info -->
        <div class="mt-6 text-center font-cyber tracking-widest text-[10px]">
            <div class="inline-block border border-white/10 bg-black/50 px-4 py-2 text-gray-500">
                LKS CLOUD 2025 // SECURE DB: <span class="text-neon-pink">DB_CIANJUR</span> // EDIT_MODE_ENGAGED
            </div>
        </div>
        
    </div>

</body>
</html>
