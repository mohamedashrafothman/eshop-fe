"use client";

import useMeQuery from "hooks/useMeQuery";

const DashboardSection = () => {
	const { data: user, isLoading, isError, error } = useMeQuery();

	if (isError && error?.status && error.status >= 500) throw error;
	if (isLoading) return <>Loading...</>;
	return (
		<>
			{JSON.stringify(user?.data?.entities.data, null, 2)} Lorem ipsum dolor sit amet
			consectetur adipisicing elit. Culpa illum impedit molestiae dolores. Ullam pariatur
			saepe quidem ad enim perspiciatis quia natus quas nisi atque nobis iure libero alias aut
			illo beatae culpa dolore officiis illum ut, in adipisci praesentium repellat quasi!
			Tempora eum debitis nemo possimus voluptatum tempore quas sunt. Labore voluptate
			distinctio quas perspiciatis repudiandae dolorum commodi eos incidunt minima
			necessitatibus, atque asperiores quia eligendi modi. Ipsum quia nam nihil officiis
			dicta! Ratione doloribus ut aliquid ipsam facilis nesciunt omnis consequatur excepturi
			dolorum, officiis architecto officia et numquam nam reprehenderit eaque fugit non
			inventore quas voluptatem voluptatibus? Enim nobis, laudantium numquam molestias
			quisquam in, corporis minima aliquam illo, temporibus mollitia vero. Ipsa exercitationem
			blanditiis totam quia temporibus, culpa similique nam unde! Animi aut quibusdam repellat
			id exercitationem accusamus culpa distinctio sapiente, eligendi officia saepe qui
			tempore placeat doloribus! Earum ducimus, perspiciatis accusantium sint, rerum pariatur
			aliquam modi recusandae, aspernatur eveniet exercitationem fuga. Autem expedita eaque
			dolorem distinctio, magnam eum laudantium perspiciatis eius a officiis facilis sed dicta
			est eos ipsam minima, animi reiciendis adipisci obcaecati error soluta doloribus ipsa
			consequuntur? Ex repellendus quos ea illo ipsam sint. Accusantium consequatur molestiae
			suscipit veritatis molestias vitae quos repudiandae eos quas voluptatum voluptatibus,
			laboriosam dicta quisquam nemo asperiores enim iusto doloribus placeat. Neque non libero
			dicta placeat eveniet nesciunt quasi enim impedit laborum ut vitae omnis maiores porro
			quisquam pariatur, asperiores accusamus sed corrupti provident quis, vero consectetur!
			Cum vero dignissimos distinctio quia magnam aut tenetur animi architecto ut debitis rem
			numquam atque laudantium, asperiores odit cumque eum temporibus. Deserunt a molestiae
			impedit itaque consequatur eius dolor ut, vel dignissimos expedita autem fugiat nobis,
			sapiente aliquam corporis tenetur, debitis consectetur! Explicabo nulla nesciunt sint
			voluptatem nihil itaque fugiat minima deserunt nam corrupti officia ab sed debitis
			magnam omnis officiis voluptate, asperiores unde. Voluptatem earum, beatae maxime
			ratione fuga deserunt esse atque iusto tempora! Recusandae libero cupiditate, placeat
			tempore necessitatibus laborum autem debitis dolore, animi consequuntur numquam neque
			quas eum magni blanditiis, non beatae. Nostrum, tempore? Fugit, eius rerum. Culpa
			voluptas, explicabo libero maiores quo reiciendis sequi dolore, cum excepturi itaque
			nihil omnis repellat earum amet minima dignissimos mollitia expedita minus ullam non.
			Quis, quibusdam nostrum doloribus facilis earum beatae ad cupiditate pariatur iure
			inventore recusandae eos, nesciunt ipsa quas minima debitis quam. Vero itaque libero
			error sint consectetur saepe recusandae asperiores voluptate, praesentium dolore minus
			fugit illum odit eveniet cumque necessitatibus doloremque perferendis et earum
			inventore. Fugiat aut distinctio, vitae hic placeat, fugit est atque modi rem
			consectetur, temporibus impedit dolores a amet dolorum quis sed! Illum fuga aut nobis
			maiores suscipit nostrum sunt officiis mollitia, aperiam, in voluptate neque obcaecati
			sint doloribus. Quibusdam placeat odit, a suscipit officia natus quidem ex nemo non
			culpa ea. Suscipit nihil excepturi enim, optio sed ducimus, placeat dolor incidunt odit
			aut veritatis possimus obcaecati fugiat iure. Eos architecto sed dolor ullam, earum
			numquam quos minima nihil esse incidunt odit porro voluptates iste similique nam
			voluptas optio amet, eum nulla, officia veniam vitae? Molestiae labore, et doloremque
			praesentium corporis autem. Ab architecto non dolorum quaerat, vel nesciunt delectus!
			Corporis, eligendi culpa. Explicabo quas quaerat maxime? Eum laboriosam praesentium
			eveniet eaque, deleniti ratione exercitationem dolor sed error pariatur dolore dolorum
			ullam, quia reprehenderit? Cumque culpa adipisci iste labore ullam voluptatum ad,
			consequuntur consequatur perspiciatis mollitia veniam cum, dolores, quidem reprehenderit
			omnis et temporibus animi aut similique eligendi? Perferendis odio, dignissimos officia
			dolor consequatur obcaecati esse id aspernatur veniam nobis fugit, aliquid aliquam non!
			Ipsa quas ab veritatis doloribus quisquam ea culpa consequatur blanditiis esse incidunt
			laborum, odio voluptate necessitatibus, maiores officia facilis tenetur, eos dolorum
			possimus sit optio quis! Alias tempore repellat rerum porro excepturi, at veritatis
			officia similique perspiciatis quibusdam error nesciunt consequuntur laudantium
			cupiditate, laborum praesentium? Consequuntur itaque a autem sint earum dicta, eligendi
			possimus est ratione cumque deleniti ducimus tenetur quisquam ad odio cupiditate aliquam
			quaerat eveniet! Odit doloribus dolore laborum praesentium aspernatur ratione porro
			quaerat sed ex omnis ullam reiciendis natus recusandae at esse, temporibus voluptas
			magni mollitia officia molestiae eveniet? Ullam dolores voluptatibus pariatur,
			repellendus quod consequuntur modi blanditiis quidem. Nostrum, vitae aperiam ipsam, nemo
			rerum voluptate numquam quidem corrupti commodi unde quibusdam laborum, illum itaque
			quaerat impedit velit quisquam consequatur voluptates cumque neque alias! Excepturi
			quaerat eaque officiis ipsam! Officia exercitationem reprehenderit in quasi, quas est
			at, blanditiis odio, dolores deleniti fugiat et culpa enim eveniet perspiciatis saepe
			necessitatibus quos temporibus natus voluptate recusandae odit? Unde dolorem cum illo!
			Aut itaque earum cum mollitia repellat perferendis ipsam molestias incidunt doloribus.
			Dolor facilis, eligendi odit ad saepe iusto vitae similique molestiae recusandae amet
			excepturi quod voluptate tempore? Maiores reiciendis ea quisquam facilis sit eligendi
			cumque. Accusantium dolores omnis cupiditate, mollitia saepe et consequuntur, ab aperiam
			hic, excepturi tempore deleniti fuga. Ea odio necessitatibus quidem nihil. Inventore
			totam ea at repellat sequi! Beatae inventore laboriosam fugit ipsam impedit delectus
			nostrum in, sequi cupiditate qui voluptate quaerat autem hic quisquam, ab sed saepe vel
			ratione odio tempore amet blanditiis, eveniet repellat! Optio dolore exercitationem
			officia inventore error culpa quod repudiandae voluptatum minima perferendis. Maiores
			repellendus magnam tempore suscipit sit, delectus voluptates assumenda laboriosam,
			veniam blanditiis nobis quo quibusdam. Repellat optio ex impedit dignissimos. Nobis quod
			excepturi nostrum nesciunt totam inventore maxime? Facilis mollitia, expedita voluptatem
			labore consequuntur enim dolorum tempore praesentium laudantium corporis voluptate
			aliquam excepturi neque aut ipsam debitis at? Odit maxime, illo culpa animi, possimus
			corporis aperiam fugiat, nostrum tempore soluta saepe deserunt. Magnam suscipit a
			reprehenderit libero esse ratione quod incidunt, laboriosam commodi animi, numquam
			quaerat earum blanditiis eius aliquid cumque, odit at distinctio recusandae possimus
			molestiae consequatur vel amet placeat? Voluptates praesentium tenetur sit nulla eos
			perferendis debitis nobis! In fugit ducimus ad cum obcaecati quas voluptatem eius
			officiis modi, nihil perferendis consequuntur provident neque asperiores vero blanditiis
			veniam? Tenetur quos, fuga repellat impedit vel quod nesciunt quo odit laborum vero,
			maiores explicabo, est reiciendis praesentium. Tempora, blanditiis? In porro qui nostrum
			consequatur sunt officiis debitis placeat dicta et praesentium ut enim nisi eum incidunt
			architecto maiores accusantium asperiores vitae fugiat totam quidem, aliquam ipsa
			magnam. Sit, blanditiis molestiae facere sequi inventore ea totam perspiciatis vitae
			provident pariatur corporis eum esse laborum modi, nulla reiciendis quaerat voluptatem
			ab recusandae eius. Recusandae itaque id et consequuntur optio ut eius nam quaerat
			excepturi error accusamus quia atque, architecto, praesentium repellat impedit vero
			quis. Officiis laboriosam a magni veritatis similique, labore corporis error distinctio
			sint molestiae atque quidem quae laborum repellat soluta, asperiores perferendis enim
			commodi reprehenderit? Magni possimus amet perspiciatis sit officiis odio laboriosam
			tenetur, unde officia vel impedit tempore eaque nemo ipsa totam repellendus qui incidunt
			dolorum hic quos expedita reprehenderit! Quae aspernatur commodi dolores ut labore
			veniam animi voluptate eveniet exercitationem at obcaecati, omnis iste ea recusandae
			provident illo impedit sunt illum debitis aut, natus dolorum voluptas. Nesciunt optio
			fuga inventore quis tenetur aut obcaecati quas laudantium, provident ab cupiditate
			dolorem ipsa consequuntur non modi pariatur recusandae dignissimos? Accusamus nisi, et
			odit nesciunt sequi quam doloribus non tempore? Blanditiis non cum neque quidem atque
			nemo sequi quasi veniam ipsum. Iure, possimus consectetur consequatur aut nam repellat
			accusamus, incidunt facere facilis, cumque ullam dolorem cum ipsam nihil aspernatur
			eaque consequuntur rerum nostrum velit nesciunt ratione porro. Repellendus reiciendis
			sed similique vel quo id porro molestiae iure cupiditate non voluptate, unde quasi
			voluptates placeat rerum, corrupti dolorum ab voluptatibus vitae assumenda omnis eos!
			Sequi doloremque itaque ad earum consectetur iusto temporibus minus dolores? Ipsa earum
			cum, quis debitis molestiae eveniet incidunt fugiat voluptatem provident, beatae
			assumenda inventore nostrum soluta vero. Nisi debitis maiores dolorem exercitationem
			dolor. Et nobis aperiam eligendi accusamus ipsa numquam praesentium commodi illo, quasi
			iusto. Commodi quia atque veniam recusandae corporis ea reprehenderit sapiente,
			perspiciatis asperiores excepturi, vel hic? Qui minima voluptatum expedita consequuntur
			possimus a ex vero alias neque, placeat tempore perferendis adipisci reiciendis nesciunt
			aliquam facere commodi sequi doloremque explicabo quasi nulla in. Dolor ea soluta autem
			ipsum suscipit esse alias, voluptatum perferendis. Minus molestias nihil, sit natus,
			magnam reiciendis iusto rerum, odit necessitatibus suscipit quibusdam. Non quos
			repellendus in eos et delectus, mollitia provident eligendi ipsam odio voluptatum
			quaerat eum exercitationem ea id iusto numquam quia laborum a natus vero suscipit quam
			aliquam facere. Ipsa quas soluta quaerat nemo provident quibusdam accusantium, tempora
			eligendi placeat consequuntur repellendus sit maiores harum nostrum neque reprehenderit
			eius labore voluptate quod illum inventore consequatur corporis vero! Necessitatibus
			quos esse ab fugit, cum et repellat veniam explicabo ut ipsa perspiciatis magnam?
			Consequatur veritatis praesentium doloribus iure earum, ea ipsum. Inventore tempore esse
			dolore quos officiis, quia odit veniam placeat nemo atque alias doloremque nulla,
			expedita iste ut rem veritatis deleniti voluptate debitis? Quia perferendis optio
			repudiandae, amet ut repellat, velit beatae, iste quae inventore dicta ducimus sunt quis
			debitis exercitationem nulla tempore dolor atque. Saepe, corporis alias eum neque nobis
			qui molestiae esse quod explicabo ad numquam odit inventore iure! At doloribus
			laudantium praesentium, eos rem beatae explicabo enim hic non quos, dolores nobis dolore
			quis debitis officiis distinctio est nihil atque, laborum voluptatem! Sequi, illum?
			Dolorem quidem voluptatum assumenda deleniti omnis quia, sapiente cumque! Ipsum ducimus
			voluptates obcaecati totam nisi delectus qui aliquid cupiditate sint eaque corporis
			atque debitis dignissimos odit cum explicabo nobis animi aut exercitationem, beatae
			doloremque. Explicabo architecto unde officiis vitae voluptatem? Reiciendis praesentium
			assumenda culpa saepe expedita reprehenderit, veritatis, molestiae illum quisquam
			excepturi aperiam asperiores perspiciatis dicta ex earum dolores eligendi cum modi!
			Pariatur nulla dolore maiores deleniti, hic numquam atque tempore cum labore inventore
			fugiat autem voluptatum illum consequatur delectus porro harum facilis magni ratione
			dolor laboriosam, blanditiis corporis. Praesentium, fugiat? Expedita delectus ratione,
			quasi quo vel exercitationem eveniet magnam maiores adipisci suscipit mollitia deleniti
			sit, nulla non voluptate? In molestiae expedita nulla reiciendis quia atque nihil fugit
			quos dolore sit totam, eveniet magni sint voluptates quibusdam! Assumenda earum optio
			facilis cumque suscipit non eius exercitationem soluta maiores. Laudantium obcaecati
			rerum consequuntur quisquam veniam, necessitatibus delectus voluptates reprehenderit
			recusandae ipsa dolor est doloremque saepe maiores velit, architecto id nam quidem
			corporis odit. Doloremque tempora vitae, perferendis iure, explicabo hic praesentium
			voluptates itaque unde blanditiis quidem, repellendus ex modi rem alias similique
			nesciunt et inventore fuga minima sint? Voluptas deserunt modi itaque harum facere
			ratione repellat quos cumque eveniet qui earum quas dicta sit quasi nemo quibusdam
			laboriosam corrupti consectetur provident, aperiam veritatis sint dignissimos quod ea.
			Sequi voluptatibus, minus corporis deserunt odit quam, asperiores natus animi enim
			voluptate quidem totam reiciendis atque ex provident consequuntur reprehenderit porro
			voluptas? Nisi libero architecto sint repudiandae, nam explicabo aut autem quo, animi
			repellendus ipsum illum itaque ipsam ullam quod ab magnam maxime ad tenetur soluta
			quaerat blanditiis! Obcaecati quas, provident voluptatum totam officia, veritatis,
			repellendus accusamus placeat quo distinctio cumque perspiciatis vitae blanditiis quod
			laudantium vel nulla itaque omnis ut reprehenderit id? Accusamus, eius mollitia hic qui
			amet, magni praesentium, quidem cupiditate autem magnam neque quis doloribus totam quo
			voluptate perferendis nam voluptatem ipsa recusandae? Ipsam non quisquam eum deserunt
			repellendus voluptates vel nemo necessitatibus, ullam nihil. Ipsam libero in excepturi
			voluptatum corrupti odit cupiditate iste aut totam error repellendus nesciunt ducimus
			aperiam vero earum consequatur aspernatur minus hic neque eos pariatur, repudiandae
			ipsa. Labore dolorum quod ducimus facere, porro eveniet asperiores? Qui est tempora modi
			vitae explicabo unde eaque quas, blanditiis, veritatis molestiae adipisci nesciunt
			soluta, sunt aperiam obcaecati dolorem. Nisi eligendi blanditiis placeat inventore
			veniam. Explicabo, itaque aliquid numquam, iure consequuntur ex sed ab officia
			laboriosam blanditiis, tempore cupiditate similique natus quod! Eligendi eveniet animi
			expedita temporibus reprehenderit, accusamus nulla cumque adipisci earum nihil iusto id
			porro beatae maiores unde aliquam praesentium, quisquam commodi aliquid ea dolore
			delectus alias. Voluptatem nisi non sunt aspernatur? Inventore voluptatem provident
			facere accusamus ad quo fugit, atque tenetur velit ipsa esse adipisci nostrum est magni
			rerum quis corrupti excepturi! Quo autem enim expedita dolores. Vero ducimus asperiores
			deserunt quo itaque, ex rerum esse tempora? Nemo ratione ut est animi cum non adipisci
			repellat id mollitia beatae deleniti odio sunt accusamus, quis quisquam provident esse
			incidunt veniam ab at facere labore vel! Ducimus qui eveniet possimus alias eos maiores
			quisquam!
		</>
	);
};

export default DashboardSection;
